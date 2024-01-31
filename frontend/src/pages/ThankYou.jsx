import React from 'react'
import { Container, Col, Row , Button} from 'reactstrap'
import {Link } from 'react-router-dom'
import '../styles/thank-you.css'

const ThankYou = () => {
  return <section>
    <Container>
        <Row>
            <Col lg = '12' className='pt-5 text-center'>
                <div className="thank__you">
                    <span>
                    <i class="ri-checkbox-circle-line"></i>
                    <h1 className="mb-3 fw-semibold">
                        Thank You! 
                    </h1>
                    <h3 className="mb-4">your tour has been booked successfully. </h3>
                    </span>
                    <Button className='btn primary__btn w-25'><Link to = '/home'>Back to home</Link></Button>

                </div>


            </Col>
        </Row>
    </Container>

  </section>
}

export default ThankYou