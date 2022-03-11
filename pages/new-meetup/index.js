import { Fragment } from "react/cjs/react.production.min";
import { useRouter } from "next/router";
import Head from 'next/head';

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="descripyion" content="Add you own meetups and create amazing network opportunities!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;

// import { useRouter } from "next/router";
// import NewMeetupForm from "../../components/meetups/NewMeetupForm";

// function NewMeetUp() {
//   const router = useRouter();

//   async function addMeetupHandler(enteredMeetupData) {
//     const response = await fetch("/api/new-meetup", {
//       method: "POST",
//       body: JSON.stringify(enteredMeetupData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();

//     console.log(data);

//     router.push("/");
//   }

//   return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
// }

// export default NewMeetUp;
