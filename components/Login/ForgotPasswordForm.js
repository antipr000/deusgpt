import styles from "./Login.module.css";

const ForgotPasswordForm = () => {
  return (
    <div id="Lost" className={`tabcontent ${styles.login_form_container}`}>
      <div className="flex w-full flex-col justify-center space-y-6 h-96">
        <div className="flex flex-col space-y-2 text-center">
          <div className="inline-block transition duration-200 ease-in-out text-content-emphasis font-medium">
            {" "}
            I forgot my password{" "}
          </div>
          <div className="grid gap-6">
            <form>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                    id="password"
                    placeholder="password*"
                    value=""
                  />
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  {" "}
                  Send New Password{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
