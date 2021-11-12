import React, {useState} from 'react'
import "../css/UploadPage.css"
import axios from 'axios'

export default function UploadPage() {
    const [image, setImage] = useState(null)
    const [tags, setTags] = useState([""])
    const [file, setFile] = useState();
    const [name, setName] = useState("");

    const changeTag = (text, index) => {
        let values = [...tags];
        values[index] = text;
        setTags(values)
    }

    const baseUrl = "https://9v4am5cs5b.execute-api.us-east-1.amazonaws.com/Alpha"

    const headers = { headers: {"x-amz-meta-customlabels": tags.join(", "), "x-api-key": "vQSHMtK5JIDabZPBblRK8QZ60FVr7HaanQrNTT75"} };

    const uploadImage = async () => {
        if (image) {
            console.log(file);
            console.log(atob(file));
            let res = await axios.put(`${baseUrl}/photos-cloudhw2/${name}`, file, headers);
            console.log(res);
        }
        setTags([""])
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var res = reader.result;
            var check = 0;
            for (let i = 0; i < res.length; i++) {
                if (res[i] == ",") {
                    check = i;
                    break;
                }
            }
            var res1 = res.slice(check+1);
            console.log(reader.result);
            console.log(res1);
            setFile(res1);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        //return reader.result;
     }

    return (
        <div>
            <div>
                {image ? <img className="image" src={image} /> : null}
                <h1>Select Image</h1>
                <input type="file" name="myImage" onChange={async (e) => {
                    setName(e.target.files[0].name);                
                    setImage(URL.createObjectURL(e.target.files[0]));
                    let i = e.target.files[0];
                    const buffer = await i.arrayBuffer();
                    let byteArray = new Int8Array(buffer);
                    // setFile(byteArray);
                    // setFile(e.target.files[0]);
                    // const reader = new FileReader();
                    // reader.readAsBinaryString(i);
                    getBase64(i);
                    // console.log(i);
                }} />
            </div>
            <div className="tags">
                {tags.map((tag,index) => {
                    return (
                        <div>
                            <input value={tag} onChange={e => {
                                changeTag(e.target.value, index);
                            }}/>
                            <button onClick={() => {
                                let values = [...tags];
                                values.splice(index,1);
                                setTags(values);
                            }}>-</button>
                        </div>
                    );
                })}
                <button onClick={() => {
                    setTags([...tags, ""])
                }}>+</button>
            </div>
            <button onClick={() => uploadImage()}>Upload</button>
        </div>
    )
}