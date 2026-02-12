import { useEffect, useState } from "react";

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
  const [email, setEmail] = useState("");
  const [searchMatric, setSearchMatric] = useState("");

  /* ================= LOAD STUDENTS ================= */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(storageKey)) || [];
    setStudents(stored);
  }, [storageKey]);

  /* ================= ADD STUDENT ================= */
  const addStudent = () => {
    if (votingStatus === "open") {
      alert("❌ Voting has started. You cannot upload students.");
      return;
    }

    if (!name || !matric || !email) {
      alert("All fields are required");
      return;
    }

    if (!/^\d+$/.test(matric)) {
      alert("Matric number must contain digits only");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email address");
      return;
    }

    if (students.some((s) => s.matric === matric)) {
      alert("❌ This matric number already exists");
      return;
    }

    if (
      students.some(
        (s) => s.email?.toLowerCase() === email.toLowerCase()
      )
    ) {
      alert("❌ This email is already assigned to another student");
      return;
    }

    const newStudent = {
      name,
      matric,
      email: email.toLowerCase(),
      hasVoted: false,
    };

    const updated = [...students, newStudent];
    setStudents(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    alert("✅ Student uploaded successfully");

    setName("");
    setMatric("");
    setEmail("");
  };

  /* ================= BULK CSV UPLOAD ================= */
  const handleCSVUpload = (e) => {
    if (votingStatus === "open") {
      alert("❌ Voting has started. You cannot upload students.");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((row) => row.trim());

      let updatedStudents = [...students];
      let addedCount = 0;

      rows.forEach((row, index) => {
        if (!row) return;

        if (index === 0 && row.toLowerCase().includes("name")) return;

        const [name, matric, email] = row.split(",");

        if (!name || !matric || !email) return;

        const cleanMatric = matric.replace(/\D/g, "").trim();
        const cleanEmail = email.trim().toLowerCase();

        const matricExists = updatedStudents.some(
          (s) => s.matric === cleanMatric
        );

        const emailExists = updatedStudents.some(
          (s) => s.email?.toLowerCase() === cleanEmail
        );

        if (!matricExists && !emailExists) {
          updatedStudents.push({
            name: name.trim(),
            matric: cleanMatric,
            email: cleanEmail,
            hasVoted: false,
          });
          addedCount++;
        }
      });

      setStudents(updatedStudents);
      localStorage.setItem(storageKey, JSON.stringify(updatedStudents));

      alert(`✅ ${addedCount} students uploaded successfully`);
    };

    reader.readAsText(file);
  };

  /* ================= DOWNLOAD CSV TEMPLATE ================= */
  const downloadTemplate = () => {
    const csvContent =
      "name,matric,email\n" +
      "John Doe,12345,johndoe@gmail.com\n" +
      "Mary James,67890,maryjames@gmail.com\n";

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute("download", "student_upload_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  /* ================= SEARCH FILTER ================= */
  const filteredStudents = students.filter((s) =>
    s.matric.includes(searchMatric)
  );

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-3">
        Upload Students – {electionYear}
      </h3>

      {votingStatus === "open" && (
        <div className="alert alert-danger text-center">
          🚫 Voting has started. Student upload is locked.
        </div>
      )}

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

        <input
          className="form-control mb-3"
          placeholder="Student Email"
          value={email}
          disabled={votingStatus === "open"}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          disabled={votingStatus === "open"}
          onClick={addStudent}
        >
          Upload Student
        </button>

        <hr />
        <label className="fw-bold mt-3">Bulk Upload (CSV)</label>
        <input
          type="file"
          accept=".csv"
          className="form-control mt-2"
          disabled={votingStatus === "open"}
          onChange={handleCSVUpload}
        />
        <small className="text-muted">
          Format: name,matric,email
        </small>

        <button
          type="button"
          className="btn btn-outline-secondary mt-2"
          onClick={downloadTemplate}
        >
          ⬇ Download CSV Template
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            Uploaded Students ({students.length})
          </h5>

          <input
            className="form-control mb-3"
            placeholder="🔍 Search by Matric"
            value={searchMatric}
            onChange={(e) =>
              setSearchMatric(e.target.value.replace(/\D/g, ""))
            }
          />

          {filteredStudents.length === 0 ? (
            <p className="text-muted text-center">
              No students found.
            </p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Matric</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, index) => (
                  <tr key={s.matric}>
                    <td>{index + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.matric}</td>
                    <td>{s.email}</td>
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
