import React, { useState } from "react";
import { AuthoriseUser, AddEvent } from "./ServerModules/Server";
import Header from "./Components/Header";
import DateTimePicker from "react-datetime-picker";
import Footer from "./Components/Footer";

export default function App() {
  let [isAuthorized, setAuthorisation] = useState("");
  let [copyMsg, setCopyMsg] = useState(false);
  let [code, setCode] = useState("");
  let [startTime, setStartTime] = useState(new Date());
  let [endTime, setEndTime] = useState(new Date());
  let [title, setTitle] = useState("");
  let [email, setEmail] = useState("");
  let [desc, setDesc] = useState("");
  let [success, setSuccess] = useState(false);
  let onStartDateChange = (date) => {
    setStartTime(date);
  };

  let onEndDateChange = (date) => {
    setEndTime(date);
  };

  let AddEventToCalender = (e) => {
    //Adding event
    e.preventDefault();

    let event = {
      summary: title,
      description: desc,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "Etc/GMT+5",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "Etc/GMT+5",
      },
      attendees: [{ email: email }, { email: "satyamsinha8158@gmail.com" }],
    };

    AddEvent(event)
      .then((response) => {
        setAuthorisation(false);
        setSuccess(true);
        console.log(response);
        setTimeout(() => {
          setEmail("");
          setTitle("");
          setDesc("");
          setStartTime(new Date());
          setEndTime(new Date());
          window.open(response.data.htmlLink, "_blank");
        }, 3000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Header setCopyMsg={setCopyMsg} />
      {copyMsg && (
        <div className="container">
          <div className="alert alert-warning my-3" role="alert">
            Paste the code in the input box
          </div>
        </div>
      )}
      {isAuthorized && (
        <div className="container">
          <div className="alert alert-success my-3" role="alert">
            You are authorised
          </div>
        </div>
      )}
      {success && (
        <div className="container">
          <div className="alert alert-success my-3" role="alert">
            Event added
          </div>
        </div>
      )}
      {/* {!isAuthorized && (
        <div className="container">
          <div className="alert alert-danger my-3" role="alert">
            You are not authorised
          </div>
        </div>
      )} */}
      <form className="container my-4 p-4">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Paste authorization code here"
                value={code}
                onChange={(event) => {
                  event.preventDefault();
                  setCode(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="form-group">
              <button
                type="button"
                className="btn btn-block btn-outline-danger"
                onClick={(event) => {
                  event.preventDefault();
                  AuthoriseUser({ code: code })
                    .then((Response) => {
                      setAuthorisation(true);
                      setCopyMsg(false);
                      setTimeout(() => {
                        setAuthorisation(false);
                      }, 3000);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Authorize
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter title of the event please"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label>Start</label>
              <DateTimePicker
                className="form-control"
                onChange={onStartDateChange}
                value={startTime}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label>End</label>
              <DateTimePicker
                className="form-control"
                onChange={onEndDateChange}
                value={endTime}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the email of your client"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter the description of event"
                rows="4"
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
                value={desc}
              ></textarea>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-block btn-outline-info"
          onClick={AddEventToCalender}
        >
          Create event
        </button>
        {/* <p>{desc}</p> */}
      </form>

      <Footer />
    </div>
  );
}
