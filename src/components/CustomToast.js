import React, { useState } from 'react'
import { Row, Toast, Col } from 'react-bootstrap'


export function CustomToast() {
	const [show, setShow] = useState(true)
	const toggleShow = () => setShow(false)

	return (
		<section>
			{ show ? (
				<Row className="mt-4 mb-4">
					<Col xs={3}></Col>
					<Col xs={6}>
						<Toast show={show} onClose={toggleShow}>
							<Toast.Header>
								<strong className="mr-auto">Welcome!</strong>
							</Toast.Header>
							<Toast.Body>
								Use the navigation buttons at the top right corner to add bookmarks, folders and access the settings.
							</Toast.Body>
						</Toast>
					</Col>
					<Col xs={3}></Col>
				</Row>
			) : null }
		</section>
	)
}
