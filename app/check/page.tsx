import Form from "../ui/home/validate-form";
export default function Validate() {
  const batikPatternUrl =
    "https://media.licdn.com/dms/image/C5622AQGYp7Uugj1kZQ/feedshare-shrink_800/0/1669709758423?e=2147483647&v=beta&t=_cjA3CaJsGoBItS_W0iNyFbAJ0Qn55jxeNpWD1qva3A";

  return (
    <div
      className="flex items-center h-screen justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${batikPatternUrl}')`,
        backgroundBlendMode: "multiply",

        backgroundPosition: "center",
      }}
    >
      <Form />
    </div>
  );
}
