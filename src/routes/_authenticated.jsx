import { createFileRoute } from "@tanstack/react-router";

let auth = true;

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (!auth) {
      console.log(location.href);
    }
  },
  component: Login,
});

function Login() {
  return (
    <div>
      <h1>Please Login</h1>

      <button>Login</button>
    </div>
  );
}
