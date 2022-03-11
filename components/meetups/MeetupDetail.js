import { Fragment } from "react/cjs/react.production.min";
import classes from "./MeetupDetail.module.css";
import Image from "next/image";

function MeetupDetail(props) {
  return (
    <Fragment>
      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Fragment>
  );
}

export default MeetupDetail;
