// import axios from "axios";
import { useEffect, useState } from "react";
import LoadingBox from "../components/LoadingBox";

import { useSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
const Universities = () => {
  const {
    listPrograms,
    deleteProgramItem,
    setProgramDetails,
    clearProgramDetail,
    updateProgram,
    createProgram,
    searchedProgrames,
  } = useActions();
  const {
    data: programs,
    error,
    loading,
  } = useSelector((state) => state.searchedPrograms);

  const { data: programdetails } = useSelector((state) => state.programDetails);
  const [popup, setPopup] = useState(false);
  const [school, setSchool] = useState(programdetails?.school);
  const [program, setProgram] = useState(programdetails?.program);
  const [location, setLocation] = useState(programdetails?.location);
  const [length, setLength] = useState(programdetails?.length);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // doRequest();
      await listPrograms();
      await searchedProgrames("");
    };

    fetchData();
  }, []);
  return (
    <div className="table-search">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="row center">
          <div className="header-form">
            <h2>My Customers</h2>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search for universities.."
                title="Type in a university"
                onChange={async (e) => {
                  await setSearch(e.target.value);
                  await searchedProgrames(e.target.value);
                }}
              />
            </div>
            <button onClick={() => setPopup(true)}>Create Program</button>
          </div>
          <table id="myTable" className={popup ? "blur" : ""}>
            <tr className="header">
              <th>ID</th>
              <th>School</th>
              <th>Program</th>
              <th>Location</th>
              <th>Length</th>
              <th></th>
              <th></th>
            </tr>
            {programs &&
              programs.map((program, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>
                    <p>{program.school}</p>
                  </td>
                  <td>
                    <p>{program.program}</p>
                  </td>
                  <td>{program.location}</td>
                  <td>{program.length}</td>
                  <td>
                    <span
                      className="fas fa-edit"
                      onClick={() => {
                        setPopup(true);
                        setProgramDetails(program.id);
                        setSchool(program.school);
                        setProgram(program.program);
                        setLocation(program.location);
                        setLength(program.length);

                        console.log("Edit");
                      }}
                    ></span>
                  </td>
                  <td>
                    <span
                      onClick={async () => {
                        console.log("program == ", program);
                        await deleteProgramItem(program.id);
                        await searchedProgrames(search);
                      }}
                    >
                      &times;
                    </span>

                    {/* <span onClick={() => console.log("delete")}>X</span> */}
                  </td>
                </tr>
              ))}
          </table>
          {popup && (
            <div className="popup">
              {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
              {error && (
                <div>{error}errrrrrrrrrrrrrrrrrrrrrrr rrrrrrr rrrrrrrrrr</div>
              )}

              <form
                className="form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (programdetails)
                    await updateProgram(programdetails.id, {
                      school,
                      program,
                      location,
                      length,
                    });
                  else
                    await createProgram({
                      school,
                      program,
                      location,
                      length,
                    });
                  setSchool("");
                  setProgram("");
                  setLocation("");
                  setLength(1);
                  await clearProgramDetail();
                  await searchedProgrames(search);

                  console.log("errorrrrrrrrrrrrrrrrrrr", error);
                  if (!error) setPopup(false);
                }}
              >
                <div>
                  {programdetails ? (
                    <h1>Edit Program</h1>
                  ) : (
                    <h1>Create Program</h1>
                  )}
                </div>
                {/* {loading && <LoadingBox></LoadingBox>}
        {error?.message && (
          <MessageBox variant="danger">{error.message}</MessageBox>
        )} */}
                <div>
                  <label>School</label>
                  <input
                    type="text"
                    id="school"
                    placeholder="Enter school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    minLength={4}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="program">Program</label>
                  <input
                    type="text"
                    id="program"
                    placeholder="Enter program"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    required
                    minLength={4}

                    // onChange={(e) => setProgram(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="location">Location address</label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    minLength={4}

                    // onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="length">Length</label>
                  <input
                    type="number"
                    id="length"
                    placeholder="Enter length"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    required
                    min={1}
                    // onChange={(e) => setLength(e.target.value)}
                  />
                </div>
                <div>
                  <label />
                  <button className="primary" type="submit">
                    {programdetails ? "Update" : "create"}
                  </button>
                </div>
                <div>
                  <label />
                  <span
                    className="closeX"
                    onClick={() => {
                      clearProgramDetail();
                      setSchool("");
                      setProgram("");
                      setLocation("");
                      setLength(1);
                      setPopup(false);
                    }}
                  >
                    X
                  </span>
                </div>
              </form>
            </div>
          )}{" "}
        </div>
      )}
    </div>
  );
};

export default Universities;
