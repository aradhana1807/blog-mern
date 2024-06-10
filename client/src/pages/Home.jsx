import { Link } from "react-router-dom";
import CloudHikari from "../images/cloudhikari.svg";
export default function Home() {
  return (
    <div className="font-display flex flex-col gap-2 p-[60px] px-3 max-w-6xl mx-auto min-h-screen items-center">
      <div className="flex items-center justify-center">
        <img src={CloudHikari} alt="cat" height="400" width="400" />
      </div>

      <div className="max-w-md md:max-w-xl">
        <h2 className="font-medium text-center italic text-white">
          Hikari and Cloud welcome you to the world of daily struggle.
          <br />
          Embark on the journey with them, as they accompany their humans
          through life&apos;s ups and downs, sharing in their daily struggles
          and triumphs
        </h2>
      </div>

      <Link
        to="/chapters"
        className="text-md text-teal-500 font-bold hover:underline"
      >
        View all chapters
      </Link>
    </div>
  );
}
