import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayloadService from "../services/payload";
import RequestService from "../services/request";

const TEST_ENDPOINT = "super-gobbler-robust";

function RequestList({ requestList, setRequestList, setPayload }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await RequestService.getAll(TEST_ENDPOINT);
        setRequestList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setRequestList]);

  // The rest of your component logic

  const handleRequestClick = async (req) => {
    navigate(`/${req.endpoint_hash}/${req.request_hash}`);
  };

  return (
    <>
      <div>
        <div id="request-list">
          <ul>
            {requestList.map((req) => {
              return (
                <li
                  onClick={() => handleRequestClick(req)}
                  key={req.request_id}
                >
                  {req.http_method} {req.http_path} {req.received_at}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RequestList;
