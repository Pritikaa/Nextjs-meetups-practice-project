import { Fragment } from "react/cjs/react.production.min";
import Head from "next/head";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect( () => {
  //     //we send http request and fetch data
  //     setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly react meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
//this func runs every time a new request is generated only on the developer side
//we use this when we need to access concrete request object or when the data changes multiple times every second
// export asyn function getServerSideProps(context) {

//   const req = context.req;
//   const res = context.res;

//    //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//   };
// };

//in this we can take advantage of caching and not re generating the page multiple times unnecessarily
//this runs before the page it is deployed i.e. neither on client nor on server side but during the build time
export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://pritika:pritika16@cluster0.sqxlx.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // this many seconds later the page will be pre-generated i.e. the data will be automatically get updated and will be displayed in the sceen nd in the code
  };
}

export default HomePage;
