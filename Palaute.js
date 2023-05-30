import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import Form from "react-bootstrap/Form";

import axios from "axios";

// TODO: Tyylittely (placeholder värit) <-- tehty
// palautteen lähetystoiminnot back-end (eri custom toggle joka painikkeelle toistaiseksi, katsotaan tarkemmin myöhemmin(?))
// painikkeiden maalaus painaessa <-- tehty
//Kyllä(1) - Osittain(2) - Ei(3) nappia painaessa arvio muuttujan tila kyseistä numeroa vastaavaksi <-- tehty
//vaihda axios kutsun osoite URL muuttujaan --> URL/palaute ja URL/palautteet <-- tehty

function CustomToggle({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey === eventKey;
  return (
    <button
      type="button"
      style={{
        backgroundColor: isCurrentEventKey ? "white" : "#b3dc7a",
        border: isCurrentEventKey ? "6px outset #b3dc7a" : "none",
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function CustomToggle1({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      style={{
        backgroundColor: isCurrentEventKey ? "white" : "#d9edbc",
        border: isCurrentEventKey ? "6px outset #b3dc7a" : "none",
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function CustomToggle2({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey === eventKey;
  return (
    <button
      type="button"
      style={{
        backgroundColor: isCurrentEventKey ? "white" : "#b3dc7a",
        border: isCurrentEventKey ? "6px outset #b3dc7a" : "none",
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function Palaute() {
  //-------------------------------------------------------------------------------------------------------------------------
  const ApiUrl = "http://localhost:5000"; //Url jossa api pyörii.

  const [lisatiedot, setLisatiedot] = useState("");
  const [maarat, setMaarat] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [isSubmitted, setSubmitted] = useState(false);

  //Palautteen eri määriin pääsee käsiksi: maarat[0].kpl1, maarat[1].kpl2, maarat[2].kpl3

  //tekstikentän muutosten seuraaja.
  const handleChange = (e) => {
    e.preventDefault();
    setLisatiedot(e.target.value);
  };

  //Formin submit, lähettää palautteen.
  const Submit = (e) => {
    e.preventDefault();

    var pvm = new Date();
    var dd = String(pvm.getDate()).padStart(2, "0");
    var mm = String(pvm.getMonth() + 1).padStart(2, "0"); //Tammikuu on 0!
    var yyyy = pvm.getFullYear();

    pvm = yyyy + "-" + mm + "-" + dd;

    const palaute = {
      palaute: e.target.value,
      lisatiedot: lisatiedot,
      sivu_Url: window.location.href,
      pvm: pvm,
    };

    axios
      .post(`${ApiUrl}/palaute`, palaute)
      .then((response) => paivita())
      .catch((error) => {
        if (error.response) {
          //Pyyntö lähti ja palvelin vastasi
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          //Pyyntöön ei vastattu
          console.log(error.request);
        } else {
          // Jotain muuta tapahtui
          console.log("Error: ", error.message);
        }
      });

    setLisatiedot("");
    setSubmitted(true);
  };

  //Päivitä funktio, jota kutsutaan, kun palaute on lähetetty ja halutaan tieto näkyviin.
  function paivita() {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(`${ApiUrl}/palauteet`);
      setMaarat(result.data);
      setLoading(false);
    };
    fetchData();
  }

  //Laskurit eri palautteille

  function kyllaLaskuri() {
    if (isLoading) {
      return "";
    }

    return `(${maarat[0].kpl1})`;
  }

  function osittainLaskuri() {
    if (isLoading) {
      return "";
    }

    return `(${maarat[1].kpl2})`;
  }

  function eiLaskuri() {
    if (isLoading) {
      return "";
    }

    return `(${maarat[2].kpl3})`;
  }

  //Muuntaa lähetä painikkeen pois, jotta sitä ei voi painaa uudestaan.
  function testi(num) {
    if (isSubmitted) return <p>Kiitos palautteestasi!</p>;
    else
      return (
        <Button variant="success" onClick={Submit} size="lg" value={num}>
          Lähetä
        </Button>
      );
  }

  return (
    <div className="Palaute" align="center">
      <Accordion defaultActiveKey="0">
        <Card className="text-center">
          <Card.Header style={{ padding: "30px", backgroundColor: "#006b38" }}>
            <h3>Palveliko tämä sisältö sinua?</h3>

            <CustomToggle eventKey="1" value={1}>
              Kyllä {kyllaLaskuri()}
            </CustomToggle>
            <CustomToggle1 eventKey="2" value={2}>
              Osittain {osittainLaskuri()}
            </CustomToggle1>
            <CustomToggle2 eventKey="3" value={3}>
              Ei {eiLaskuri()}
            </CustomToggle2>
          </Card.Header>

          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Mistä pidit tässä sisällössä?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name={1}
                    placeholder="Kirjoita palautteesi"
                    onChange={handleChange}
                    value={lisatiedot}
                    maxLength={255}
                  />
                </Form.Group>
                {testi(1)}{" "}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
                    Mitä tietoa etsit sivulta? Vastaa ja auta meitä kehittämään
                    sivustoa.
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name={2}
                    placeholder="Kirjoita palautteesi"
                    onChange={handleChange}
                    value={lisatiedot}
                    maxLength={255}
                  />
                </Form.Group>
                {testi(2)}{" "}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
                    Mitä tietoa etsit sivulta? Vastaa ja auta meitä kehittämään
                    sivustoa.
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name={3}
                    placeholder="Kirjoita palautteesi"
                    onChange={handleChange}
                    value={lisatiedot}
                    maxLength={255}
                  />
                </Form.Group>
                {testi(3)}{" "}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Palaute;

