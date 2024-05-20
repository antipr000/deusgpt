import { useState } from "react";
import styles from "./Login.module.css";
import { registerWithEmail } from "../../firebase/utils";

const RegistrationForm = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypedPassword: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onCheckChanged = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const submit = async (event) => {
    event.preventDefault();
    const { email, password, firstName, lastName, retypedPassword } =
      registrationData;
    // Do validations
    if (!termsAccepted) {
      window.alert("You must accept terms of service!");
    } else if (retypedPassword !== password) {
      window.alert("The passwords do not match!");
    } else if (!firstName || !lastName || !email || !password) {
      window.alert("All fields are mandatory!");
    } else {
      setLoading(true);
      registerWithEmail(email, password, firstName, lastName);
      setLoading(false);
    }
  };

  return (
    <div id="Register" className={`tabcontent ${styles.login_form_container}`}>
      <div className="flex flex-col space-y-2 text-center">
        <div className="inline-block transition duration-200 ease-in-out text-content-emphasis font-medium">
          Create an account
        </div>
        <div className="grid gap-6">
          <form>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <input
                  value={registrationData.firstName}
                  onChange={onChange}
                  name="firstName"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                  id="name"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="grid gap-1">
                <input
                  value={registrationData.lastName}
                  onChange={onChange}
                  name="lastName"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                  id="lastname"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="grid gap-1">
                <input
                  value={registrationData.email}
                  onChange={onChange}
                  name="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-1">
                <input
                  value={registrationData.password}
                  onChange={onChange}
                  name="password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="grid gap-1">
                <input
                  value={registrationData.retypedPassword}
                  onChange={onChange}
                  name="retypedPassword"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                  id="retype-password"
                  placeholder="Retype Password"
                  required
                />
              </div>
              <div className={`grid gap-1 d-flex w-100 justify-center`}>
                <input
                  value={termsAccepted}
                  onChange={onCheckChanged}
                  name="rulesAccepted"
                  aria-checked="false"
                  aria-errormessage=":R1j6eedaakldd6pd5aq:"
                  aria-invalid="false"
                  type="checkbox"
                  id="termsAccepted"
                />
                <span> I Accept the Rules </span>
              </div>
              <button
                onClick={submit}
                disabled={loading}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
