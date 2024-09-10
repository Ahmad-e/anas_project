import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Loading = () => {
  return (
    <Container>
      <Row>
        <Col>
           
          url('data:image/svg+xml,
          <svg  viewBox="0 0 200 200">
            <circle
              fill="#D9B056"
              stroke="#D9B056"
              stroke-width="15"
              r="15"
              cx="40"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#D9B056"
              stroke="#D9B056"
              stroke-width="15"
              r="15"
              cx="100"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#D9B056"
              stroke="#D9B056"
              stroke-width="15"
              r="15"
              cx="160"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
          
        </Col>
      </Row>
    </Container>
  );
};
export default Loading;
