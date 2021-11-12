import React, {useState, useEffect} from 'react'
import "../css/SearchPage.css"
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function SearchPage() {
    const [search, setSearch] = useState("");
    const [images, setImages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [searched, setSearched] = useState(false);

    const baseUrl = "https://9v4am5cs5b.execute-api.us-east-1.amazonaws.com/Alpha"

    const headers = { headers: {"x-api-key": "vQSHMtK5JIDabZPBblRK8QZ60FVr7HaanQrNTT75"} };

    const searchImages = () => {
        if (search !== "") {
            axios.get(`${baseUrl}/search?q=${search}`, headers).then(res => {                
                setImages(res.data);
                setSearch("");
                setSearched(true);
            });
        }
    }

    const {transcript, resetTranscript} = useSpeechRecognition();

    const handleClick = () => {
        if (!isRecording) {
            setSearch("");
            SpeechRecognition.startListening({ language: 'en-US' });
            setIsRecording(!isRecording);
        } else {
            SpeechRecognition.stopListening();
            setIsRecording(!isRecording);
            setSearch(transcript);
            resetTranscript();
        }

    }

    const displayImages = () => {
        if (images.length == 0 && searched) {
            return <div>No search results for that request.</div>
        } else if (images[0] == "badKeyword") {
            return <div>Bad Keyword (Ex: Show me dogs, dogs)</div>
        } else {
            return (
                <div className="images">
                {images.map(image => {
                    return (
                        <img className="image" src={image} />
                    );
                })}
            </div>
            );
        }
    }

    return (
        <div>
            <div className="search-field">
                <button onClick={handleClick}>{isRecording ? "Stop Recording" : "Record"}</button>
                <input value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }}></input>
                <button onClick={() => searchImages()}>Search</button>
            </div>
            {displayImages()}
        </div>
    )
}
