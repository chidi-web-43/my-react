import CandidateCard from "../components/CandidateCard";
import { useNavigate } from "react-router-dom";

function Vote() {
  const navigate = useNavigate();
  const matricNumber = localStorage.getItem("matricNumber");

  // ✅ GET VOTING STATUS
  const votingStatus = localStorage.getItem("votingStatus");

  const candidates = [
    { name: "John Doe", manifesto: "Improve student welfare", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Jane Smith", manifesto: "Enhance campus facilities", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Ali Musa", manifesto: "Better library services", photo: "https://randomuser.me/api/portraits/men/76.jpg" },
    { name: "Grace Okoro", manifesto: "More extracurricular activities", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  const handleVote = (name) => {
    const hasVoted = localStorage.getItem(`voted_${matricNumber}`);

    if (hasVoted === "true") {
      alert("You have already voted!");
      navigate("/dashboard");
      return;
    }

    localStorage.setItem(`voted_${matricNumber}`, "true");
    localStorage.setItem(`vote_${matricNumber}`, name);

    alert(`Vote successfully cast for ${name}`);
    navigate("/dashboard");
  };

  // 🚫 STOP RENDERING IF VOTING IS CLOSED
  if (votingStatus !== "open") {
    return (
      <div className="container text-center mt-5">
        <h3 className="text-danger fw-bold">Voting is currently closed</h3>
        <p>Please wait for the Electoral Committee to open voting.</p>
      </div>
    );
  }

  // ✅ RENDER VOTING UI ONLY IF OPEN
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cast Your Vote</h2>

      <div className="row g-3">
        {candidates.map((c, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <CandidateCard
              name={c.name}
              manifesto={c.manifesto}
              photo={c.photo}
              onVote={() => handleVote(c.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vote;
