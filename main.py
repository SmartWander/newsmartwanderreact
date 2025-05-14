import streamlit as st
from pymongo import MongoClient
import cohere
import json
import requests
from datetime import datetime
from urllib.parse import quote_plus
import re
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import time
import textwrap
from collections import defaultdict
from translate import Translator
from gtts import gTTS
import base64
import uuid
# ========== API KEYS ========== 
MONGO_URI = "mongodb+srv://kkrh2022:X8XTDZ0kEffpppxg@smartwandercluster.o8nm3zi.mongodb.net/?retryWrites=true&w=majority&appName=smartwandercluster"
COHERE_API_KEY = "Idqw0gWuWvynbyRc5DIppy2RyrJ818uC84tkDX0c"
WEATHER_API_KEY = "4e637805af5ad3add1a92ad4992024d7"
GOOGLE_PLACES_API_KEY = "AIzaSyAvoDCd5Z7TD8CN0GuYs379xJRMRb1W-t4"

# ========== INIT CLIENTS ========== 
client = MongoClient(MONGO_URI)
db = client["smartwander_db"]
itinerary_collection = db["itineraries"]
co = cohere.Client(COHERE_API_KEY)

# ========== LOAD TOURIST DATA ========== 
def load_tourist_data_from_json():
    try:
        with open("data.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except Exception as e:
        st.error(f"Failed to load data.json: {e}")
        return {}

attractions = load_tourist_data_from_json()

# ========== WEATHER API ========== 
def get_weather_forecast(city, days=3):
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={WEATHER_API_KEY}&units=metric"
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        if "list" not in data:
            raise ValueError("Invalid weather response")

        daily_forecast = {}
        for entry in data["list"]:
            dt = datetime.fromtimestamp(entry["dt"])
            if dt.hour == 12:
                date = dt.date().isoformat()
                if len(daily_forecast) < days:
                    daily_forecast[date] = {
                        "temp": entry["main"]["temp"],
                        "description": entry["weather"][0]["description"]
                    }
        return daily_forecast
    except Exception as e:
        print("Weather API error:", e)
        return {f"Day {i+1}": {"temp": "N/A", "description": "Weather unavailable"} for i in range(days)}

# ========== GOOGLE PLACES API ========== 
def get_nearby_restaurant(lat, lng, rank=0, radius=500):
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=restaurant&key={GOOGLE_PLACES_API_KEY}"
    try:
        response = requests.get(url)
        data = response.json()
        if "results" in data and len(data["results"]) > 0:
            restaurant = data["results"][rank % len(data["results"])]
            name = restaurant["name"]
            place_id = restaurant["place_id"]
            map_link = f"https://www.google.com/maps/place/?q=place_id:{place_id}"
            return name, map_link
        else:
            return "No restaurant found", "N/A"
    except Exception as e:
        print(f"Error fetching restaurant data: {e}")
        return "Error", "N/A"

# ========== QUERY GENERATION ========== 
def create_itinerary_query(data, destination, mood=None, days=2, selected_places=None, start_time=None):
    if destination not in data:
        return f"No info available for {destination}."

    days = min(days, 5)
    filtered = [
        attr for attr in data[destination]
        if (mood is None or attr['mood'].lower() == mood.lower()) and 
           (attr['name'] in selected_places if selected_places else True)
    ]
    if not filtered:
        return f"No attractions in {destination} match the mood '{mood}' or selected places." 

    weather = get_weather_forecast(destination, days)
    query = f"Generate a {days}-day travel itinerary for a tourist visiting {destination}.\n"
    query += f"The tourist prefers a {mood} mood.\n" if mood else "The tourist has no specific mood preference.\n"

    query += "\nWeather forecast:\n"
    for i, (date, info) in enumerate(weather.items(), start=1):
        query += f"Day {i} ({date}): {info['description'].capitalize()}, {info['temp']}°C\n"

    query += "\nTourist attractions:\n"
    for attr in filtered:
        query += f"- {attr['name']}: {attr['description']} (Mood: {attr['mood']})\n"

    query += f"\nNow, generate a detailed {days}-day itinerary in this format:\n"
    query += "Day 1 (May 03): Weather: <weather condition and temperature>.\n"
    query += "Morning[10 AM - 1 PM]: <Activity details>\n"
    query += "Lunch[1 PM - 2:30 PM]: <Meal suggestion with restaurant name and Google Maps link>\n"
    query += "Afternoon[2:30 PM - 5:30 PM]: <Activity details>\n"
    query += "Evening[5:30 PM - 8 PM]: <Optional or relaxing activity>\n\n"
    query += "Use a friendly and informative tone. Do not include hashtags or special characters. Plain text only.\n"
    query+="At the end of each day, include a clearly labeled paragraph titled '🚨 Travel Safety Tips' with practical safety advice for that day's locations (e.g., avoid heat exposure, beware of crowded areas, local emergency numbers, etc.)."

    return query

# ========== MAIN APP ========== 
if __name__ == "__main__": 
    st.title("🧭 SmartWander Itinerary Generator")

    # Get district names from JSON
    destinations = list(attractions.keys())
    destination = st.selectbox("Select Destination", options=destinations)

    # Mood dropdown
    mood_options = [
        "Spiritual & Cultural",
        "Nature & Relaxation",
        "History & Heritage",
        "Fun & Entertainment",
        "Adventurous & Outdoors",
        "None"
    ]
    mood = st.selectbox("Select Mood", options=mood_options)
    if mood == "None":
        mood = None

    days_input = st.number_input("Enter number of days (1–5)", min_value=1, max_value=5, value=2)
    travel_date = st.date_input("Select start date of your trip")
    
    if "prev_inputs" not in st.session_state:
        st.session_state.prev_inputs = {}

    if destination:
        generate = st.button("🚀 Generate Itinerary")

        if generate:
            key = f"{destination}-{mood}-{days_input}"
            formatted_start = travel_date.strftime("%B %d")
            query = create_itinerary_query(attractions, destination, mood if mood else None, days=days_input)
            query = query.replace("Day 1 (May 03)", f"Day 1 ({formatted_start})")

            response = co.chat(model="command-r", message=query, temperature=0.7)

            st.session_state.itinerary_text = response.text
            st.session_state.prev_inputs["key"] = key
            st.session_state.prev_inputs["query"] = query
            st.session_state.generated = True
            st.session_state.edit_mode = False
            st.session_state.personalize_mode = False

        if st.session_state.get("generated") and "itinerary_text" in st.session_state:
            st.subheader("📝 Generated Itinerary")
            current_text = st.session_state.itinerary_text
            st.write(current_text)

            personalize = st.button("Want to personalize the itinerary?")
            if personalize:
                st.session_state.personalize_mode = True

            if st.session_state.get("personalize_mode", False):
                available_places = [attr["name"] for attr in attractions.get(destination, [])]
                selected_places = st.multiselect("Select places to include in your itinerary", options=available_places)

                if selected_places:
                    if st.button("📝 Update Itinerary"):
                        update_query = create_itinerary_query(
                            attractions, destination, mood if mood else None, days_input, selected_places
                        )
                        update_response = co.chat(model="command-r", message=update_query, temperature=0.7)
                        updated_itinerary = update_response.text
                        st.session_state.itinerary_text = updated_itinerary
                        st.write(updated_itinerary)

            if st.button("💾 Save & Download PDF"):
                buffer = BytesIO()
                p = canvas.Canvas(buffer, pagesize=letter)
                text_object = p.beginText(40, 750)
                text_object.setFont("Helvetica", 12)

                for line in current_text.splitlines():
                    text_object.textLine(line)
                    if text_object.getY() < 40:
                        p.drawText(text_object)
                        p.showPage()
                        text_object = p.beginText(40, 750)
                        text_object.setFont("Helvetica", 12)

                p.save()
                buffer.seek(0)

                st.success("Itinerary saved and ready to download!")
                st.download_button(
                    label="📥 Download Itinerary PDF",
                    data=buffer,
                    file_name=f"{destination}_itinerary.pdf",
                    mime="application/pdf"
                )
import io

# ========== Translation Function ==========
def translate_to_kannada(text):
    try:
        cleaned_text = text.strip()
        translator = Translator(to_lang="kn")  # Kannada language code
        translated = translator.translate(cleaned_text)
        return translated
    except Exception as e:
        return f"[Translation error: {e}]"

# ========== Text-to-Speech Function ==========
def text_to_speech_kannada(text):
    try:
        tts = gTTS(text=text, lang='kn')
        audio_bytes = io.BytesIO()
        tts.write_to_fp(audio_bytes)
        audio_bytes.seek(0)
        return audio_bytes
    except Exception as e:
        st.error(f"Text-to-Speech error: {e}")
        return None

# ========== Streamlit App ==========
st.header("🌐 English to Kannada Translator with Voice")

user_input = st.text_area("Enter text in English", key="translator_input")

if st.button("Translate to Kannada"):
    if user_input.strip():
        # Translate
        kannada_output = translate_to_kannada(user_input)
        st.success("Translated Text:")
        st.write(kannada_output)

        # Convert to Speech
        audio_file = text_to_speech_kannada(kannada_output)
        if audio_file:
            st.markdown("🔊 **Listen in Kannada:**")
            st.audio(audio_file, format='audio/mp3')
    else:
        st.warning("Please enter some text.")