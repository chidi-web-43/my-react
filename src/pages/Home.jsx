import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../assets/logo1.png";
import { useEffect } from "react";
import '../App.css';

function Home() {
  const heroImages = [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1470&q=80"
  ];

  useEffect(() => {
    const carousel = document.querySelector('#heroCarousel');
    const interval = setInterval(() => {
      const active = carousel.querySelector('.carousel-item.active');
      active.classList.remove('active');
      const next = active.nextElementSibling || carousel.querySelector('.carousel-item:first-child');
      next.classList.add('active');
    }, 5000); // slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>

      {/* HERO / BANNER SLIDER */}
      <div id="heroCarousel" className="carousel slide">
        <div className="carousel-inner">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "90vh",
              }}
            >
              <div className="d-flex align-items-center h-100">
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-lg-8 bg-dark bg-opacity-75 text-white p-4 rounded">

                      {/* PROFESSIONAL HEADLINE */}
                      <h1 className="fw-bold mb-3">Welcome to the Student Voter Portal</h1>
                      <h5 className="mb-3">Empowering Students Through Transparent Elections</h5>

                      <p className="lead">
                        Official Online Voting Platform for SUG Presidential Elections.
                        Vote securely, transparently, and from anywhere.
                      </p>

                      <div className="mt-4">
                        <Link to="/login" className="btn btn-success btn-lg me-3">
                          Student Login
                        </Link>
                        <Link to="/results" className="btn btn-outline-light btn-lg">
                          View Results
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTICE SECTION */}
      <section className="bg-light py-4">
        <div className="container text-center">
          <p className="mb-0 fw-semibold">
            🗳️ Voting Period: <span className="text-success">Only Monday</span> | One student, one vote.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container my-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Why Use This Platform?</h2>
          <p className="text-muted">Designed to ensure fairness, transparency, and credibility</p>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Secure Voting</h5>
                <p className="card-text">Each student can vote only once using verified credentials.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Transparent Results</h5>
                <p className="card-text">Election results are displayed clearly and fairly.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Accessible Anywhere</h5>
                <p className="card-text">Vote using your phone, tablet, or computer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY MESSAGE */}
      <section className="bg-success text-white py-5">
        <div className="container text-center">
          <h4 className="fw-bold mb-3">Message from the Electoral Committee</h4>
          <p className="lead">
            This platform is officially approved for conducting the
            Students’ Union Government elections in a fair and credible manner.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
