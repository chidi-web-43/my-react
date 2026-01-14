import { useEffect, useState } from "react";
import { isElectionLocked } from "../utils/ElectionLock";

function UploadStudent() {
  const electionYear =
    localStorage.getItem("electionYear") ||
    new Date().getFullYear().toString();

  const storageKey = `students_${electionYear}`;

  const votingStatus =
    localStorage.getItem(`votingStatus_${electionYear}`) || "closed";

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchMatric, setSearchMatric] = useState("");

  /* ================= LOAD STUDENTS ================= */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(storageKey)) || [];
    setStudents(stored);
  }, [storageKey]);

  /* ================= STRONG PASSWORD CHECK ================= */
  const isStrongPassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(pwd);
  };

  /* ================= ADD STUDENT ================= */
  const addStudent = () => {
    if (votingStatus === "open") {
      alert("❌ Voting has started. You cannot upload students now.");
      return;
    }

    if (!name || !matric || !password) {
      alert("All fields are required");
      return;
    }

    if (!/^\d+$/.test(matric)) {
      alert("Matric number must contain digits only");
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    const exists = students.some(
      (s) => s.matric === matric
    );

    if (exists) {
      alert("This matric number already exists");
      return;
    }

    const newStudent = {
      matric,
      name,
      password,
    };

    const updated = [...students, newStudent];
    setStudents(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setName("");
    setMatric("");
    setPassword("");

    alert("✅ Student added successfully");
  };

  /* ================= DELETE STUDENT ================= */
  const deleteStudent = (matric) => {
    if (votingStatus === "open") {
      alert("❌ Voting has started. You cannot modify students.");
      return;
    }

    const updated = students.filter(
      (s) => s.matric !== matric
    );
    setStudents(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  /* ================= FILTER STUDENTS ================= */
  const filteredStudents = students.filter((s) =>
    s.matric.includes(searchMatric)
  );

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-3">
        Upload Students – {electionYear}
      </h3>

      {/* WARNING */}
      {votingStatus === "open" && (
        <div className="alert alert-danger text-center">
          🚫 Voting has already started. Student upload is locked.
        </div>
      )}

      {/* ADD STUDENT FORM */}
      <div className="card shadow-sm p-4 mb-4">
        <input
          className="form-control mb-3"
          placeholder="Student Full Name"
          value={name}
          disabled={votingStatus === "open"}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Matric Number"
          value={matric}
          disabled={votingStatus === "open"}
          onChange={(e) =>
            setMatric(e.target.value.replace(/\D/g, ""))
          }
        />

        {/* PASSWORD FIELD */}
        <div className="input-group mb-2">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Strong Password"
            value={password}
            disabled={votingStatus === "open"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="input-group-text"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              }`}
            ></i>
          </span>
        </div>

        <small className="text-muted d-block mb-3">
          Password must include uppercase, lowercase, number & symbol.
        </small>

        <button
          className="btn btn-primary w-100"
          disabled={votingStatus === "open"}
          onClick={addStudent}
        >
          Upload Student
        </button>
      </div>

      {/* STUDENT LIST */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            Uploaded Students ({students.length})
          </h5>

          {/* SEARCH */}
          <input
            className="form-control mb-3"
            placeholder="🔍 Search by Matric Number"
            value={searchMatric}
            onChange={(e) =>
              setSearchMatric(e.target.value.replace(/\D/g, ""))
            }
          />

          {filteredStudents.length === 0 ? (
            <p className="text-muted text-center">
              No student found.
            </p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Matric</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, index) => (
                  <tr key={s.matric}>
                    <td>{index + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.matric}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={votingStatus === "open"}
                        onClick={() => deleteStudent(s.matric)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadStudent;
