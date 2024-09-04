import { espectre } from "../../../../assets";
import "./InformationCard.scss";
export function InformationCard() {
  return (
    <div className="card">
      <img src={espectre} alt=":)" className="card-img" />
      <h1 className="card-title">Coding Design</h1>
      <div className="card-body">
        <div>
          <strong>9812</strong>
          <p>Likes</p>
        </div>
        <div>
          <strong>7890</strong>
          <p>Download</p>
        </div>
      </div>
    </div>
  );
}
