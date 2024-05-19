import styles from "./Login.module.css";

const RegistrationForm = () => {
    return(
        <div id="Register" class={`tabcontent ${styles.login_form_container}`}>
            <div class="flex flex-col space-y-2 text-center">
                <div class="inline-block transition duration-200 ease-in-out text-content-emphasis font-medium">Create an account</div>
                <div class="grid gap-6">
                    <form>
                        <div class="grid gap-2">
                            <div class="grid gap-1">
                                <input type="name" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring" id="name" placeholder="Name" autocapitalize="none" autocomplete="name" autocorrect="off" value="" />
                            </div>
                            <div class="grid gap-1">
                                <input type="lastname" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring" id="lastname" placeholder="Last Name" autocapitalize="none" autocomplete="lastname" autocorrect="off" value="" />
                            </div>
                            <div class="grid gap-1">
                                <input type="email" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring" id="email" placeholder="Email" autocapitalize="none" autocomplete="email" autocorrect="off" value="" />
                            </div>
                            <div class="grid gap-1">
                                <input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring" id="password" placeholder="Password" autocapitalize="none" autocomplete="password" autocorrect="off" value="" />
                            </div>
                            <div class="grid gap-1">
                                <input type="password" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring" id="password" placeholder="Password" autocapitalize="none" autocomplete="password" autocorrect="off" value="" />
                            </div>
                            <div class={`grid gap-1 d-flex w-100 justify-center`}>
                                <input aria-checked="false" aria-errormessage=":R1j6eedaakldd6pd5aq:" aria-invalid="false" class={``} type="checkbox" value="false" />
                                <span> I Accept the Rules </span>
                            </div>
                            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm;