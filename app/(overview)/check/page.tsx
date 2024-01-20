import { fetchIsVoteActive } from "../../lib/data";
import Form from "../../ui/home/validate-form";
export default async function Validate() {
  const isActive = await fetchIsVoteActive("");

  return (
    <div
      className="flex items-center w-full h-screen justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('/prambanan.jpg')`,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isActive ? <Form /> : "Selesai"}
    </div>
  );
}
