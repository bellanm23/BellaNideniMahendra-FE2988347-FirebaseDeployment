import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dateTime = new Date();

  const API_BASE_URL = "https://gallery-app-server.vercel.app/photos"

  const editPhoto = (e) => {
    e.preventDefault();
    // TODO: answer here
    const newData = {
      imageUrl: imageUrl,
      captions: captions,
      updatedAt: dateTime,
    }
    fetch(`${API_BASE_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type" : "application/json",
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(!responseJson.error) {
        navigate("/photos");
      }else {
        setError(responseJson.error);
      }
    })
  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    fetch (`${API_BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setImageUrl(json.imageUrl)
        setCaptions(json.captions)
        setLoading(false)
      })
      
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
