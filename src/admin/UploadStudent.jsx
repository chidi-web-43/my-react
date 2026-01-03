import { useState } from "react";

function UploadStudent() {
  const [matric, setMatric] = useState("");
  const [name, setName] = useState("");
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );

  const addStudent = () => {
    if (!matric || !name) {
      alert("All fields required");
      return;
    }

    if (!/^\d+$/.test(matric)) {
      alert("Matric number must be numbers only");
      return;
    }

    const exists = students.some((s) => s.matric === matric);
    if (exists) {
      alert("Student already exists");
      return;
    }

    const newStudent = {
      matric,
      name,
      password: "",
      hasVoted: false,
    };

    const updated = [...students, newStudent];
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));

    setMatric("");
    setName("");
    alert("Student uploaded successfully");
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4">Upload Students</h3>

      <div className="card p-4 shadow-sm">
        <input
          className="form-control mb-3"
          placeholder="Matric Number"
          value={matric}
          onChange={(e) => setMatric(e.target.value.replace(/\D/g, ""))}
        />

        <input
          className="form-control mb-3"
          placeholder="Student Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={addStudent}>
          Upload Student
        </button>
      </div>
    </div>
  );
}

export default UploadStudent;
