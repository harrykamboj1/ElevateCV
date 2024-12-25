import { apiUrl } from "@/lib/constants";
import { ShareSocial } from "react-share-social";

export default function ShareResume({
  resumeId,
}: {
  resumeId: string | undefined;
}) {
  return (
    <ShareSocial
      style={style}
      url={apiUrl + "/my-resume/" + resumeId + "/share"}
      socialTypes={["facebook", "twitter", "whatsapp", "linkedin"]}
    />
  );
}

const style = {
  root: {
    background: "#191919",
    borderRadius: 3,
    border: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "items-center",
    alignItems: "center",
    color: "white",
  },
  copyContainer: {
    border: "2px solid grey",
    background: "#191919",
  },
  title: {
    color: "red",
    fontStyle: "dmSans",
  },
};
