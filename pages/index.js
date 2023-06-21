import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newslatter-registration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name="description" content="find a lot of great events"></meta>
      </Head>
      <NewsletterRegistration/>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
}

export default HomePage;
