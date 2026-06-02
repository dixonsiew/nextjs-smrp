'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import { AuthService } from '../../api/auth';
import { useState } from 'react';
import { Loading } from '../../../components/Loading';

// import hooks
import useMounted from 'hooks/useMounted';

const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const hasMounted = useMounted();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await AuthService.login(username, password);
    setLoading(false);
    if (!response.success) {
      toast.error(response.error);
      return;
    }

    const { token, refresh_token } = response;
    router.replace('/main');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              {/* <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link> */}
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted &&
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control type="text" name="username" placeholder="Enter username" required="" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="**************" required="" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">Sign In</Button>
                  </div>
                </div>
              </Form>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default page;