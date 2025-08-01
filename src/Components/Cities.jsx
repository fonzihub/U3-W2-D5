import { Component } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
class Cities extends Component {
  state = {
    remoteCities: [],
  };
  getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return "bi bi-sun-fill";
      case "Clouds":
        return "bi bi-cloud-fill";
      case "Rain":
        return "bi bi-cloud-rain-fill";
      case "Thunderstorm":
        return "bi bi-cloud-lightning-rain-fill";
      case "Snow":
        return "bi bi-snow";
      case "Drizzle":
        return "bi bi-cloud-drizzle";
      case "Mist":
      case "Fog":
      case "Haze":
        return "bi bi-cloud-fog2-fill";
      default:
        return "bi bi-question-circle";
    }
  };

  fetchCities = () => {
    const cityList = [
      "Bangkok",
      "Rome",
      "London",
      "Tokyo",
      "New York",
      "Rio de Janeiro",
    ];

    cityList.forEach((city) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c5ae8aaf755d64a7466ffbbd290cc11&units=metric`
      )
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("errore nella chiamata");
          }
        })
        .then((data) => {
          this.setState((prevState) => ({
            remoteCities: [...prevState.remoteCities, data],
          }));
        })
        .catch((e) => {
          console.log("errore!", e);
        });
    });
  };

  componentDidMount() {
    this.fetchCities();
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            {this.state.remoteCities.map((cityData, index) => (
              <Col xs={12} md={6} key={index}>
                <Card border="info" className="mt-4">
                  <Card.Header>{cityData.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>Meteo Attuale</Card.Title>
                    <Card.Text>
                      <i className="bi bi-thermometer-half"></i> Temperatura:{" "}
                      {cityData.main.temp}°C
                      <br />
                      <i
                        className={this.getWeatherIcon(
                          cityData.weather[0].main
                        )}
                      ></i>{" "}
                      {cityData.weather[0].main}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cities;
