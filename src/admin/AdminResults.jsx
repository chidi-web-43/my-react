import { useEffect, useState } from "react";


function AdminResults() {
  const electionYear =
    localStorage.getItem("electionYear") ||
    new Date().getFullYear().toString();

  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    const storedCandidates =
      JSON.parse(localStorage.getItem(`candidates_${electionYear}`)) || [];
    const storedVotes =
      JSON.parse(localStorage.getItem(`votes_${electionYear}`)) || {};

    setCandidates(storedCandidates);
    setVotes(storedVotes);
  }, [electionYear]);

  const grouped = candidates.reduce((acc, c) => {
    if (!acc[c.position]) acc[c.position] = [];
    acc[c.position].push(c);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">
        Election Results – {electionYear}
      </h3>

      {Object.keys(grouped).length === 0 && (
        <p className="text-danger">No results available.</p>
      )}

      {Object.entries(grouped).map(([position, list]) => {
        const winner = list.reduce((max, c) =>
          (votes[c.id] || 0) > (votes[max.id] || 0) ? c : max
        );

        return (
          <div key={position} className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold">{position}</h5>

              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.id}>
                      <td>
                        {c.name}
                        {winner.id === c.id && (
                          <span className="badge bg-success ms-2">
                            WINNER
                          </span>
                        )}
                      </td>
                      <td>{votes[c.id] || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        );
      })}
    </div>
    
  );
}

export default AdminResults;
