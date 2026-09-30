let applications = [];

const applicationForm =
    document.getElementById("applicationForm");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const companyInput =
    document.getElementById("company");

const jobTitleInput =
    document.getElementById("jobTitle");

const locationInput =
    document.getElementById("location");

const applicationDateInput =
    document.getElementById("applicationDate");

const salaryInput =
    document.getElementById("salary");

const statusInput =
    document.getElementById("status");

const applicationsList =
    document.getElementById("applicationsList");


// ========================================
// LOAD APPLICATIONS FROM MONGODB
// ========================================

async function loadApplications() {

    try {

        const response =
            await fetch(
                "http://localhost:3000/api/applications"
            );

        applications =
            await response.json();

        renderApplications();

        updateDashboard();

    } catch (error) {

        console.error(
            "Error loading applications:",
            error
        );
    }
}


// ========================================
// ADD APPLICATION
// ========================================

applicationForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const application = {

            company:
                companyInput.value,

            jobTitle:
                jobTitleInput.value,

            location:
                locationInput.value,

            applicationDate:
                applicationDateInput.value,

            salary:
                Number(salaryInput.value) || 0,

            status:
                statusInput.value
        };


        try {

            const response =
                await fetch(
                    "http://localhost:3000/api/applications",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(application)
                    }
                );


            const savedApplication =
                await response.json();


            applications.push(
                savedApplication
            );


            renderApplications();

            updateDashboard();


            applicationForm.reset();


        } catch (error) {

            console.error(
                "Error adding application:",
                error
            );
        }
    }
);


// ========================================
// SEARCH AND FILTER
// ========================================

function getFilteredApplications() {

    const searchText =
        searchInput.value.toLowerCase();


    const selectedStatus =
        statusFilter.value;


    return applications.filter(
        function(application) {

            const company =
                application.company.toLowerCase();


            const jobTitle =
                application.jobTitle.toLowerCase();


            const matchesSearch =
                company.includes(searchText) ||
                jobTitle.includes(searchText);


            const matchesStatus =
                selectedStatus === "All" ||
                application.status === selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );
        }
    );
}


// ========================================
// DISPLAY APPLICATIONS
// ========================================

function renderApplications() {

    applicationsList.innerHTML = "";


    const filteredApplications =
        getFilteredApplications();


    if (filteredApplications.length === 0) {

        applicationsList.innerHTML =
            "<p>No applications found.</p>";

        return;
    }


    filteredApplications.forEach(
        function(application) {

            const card =
                document.createElement("div");


            card.className =
                "application-card";


            card.innerHTML = `

                <h3>
                    ${application.company}
                </h3>

                <p>
                    <strong>Job Title:</strong>
                    ${application.jobTitle}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${
                        application.location ||
                        "Not provided"
                    }
                </p>

                <p>
                    <strong>Application Date:</strong>
                    ${
                        application.applicationDate ||
                        "Not provided"
                    }
                </p>

                <p>
                    <strong>Salary:</strong>
                    ${
                        application.salary
                            ? "$" + application.salary
                            : "Not provided"
                    }
                </p>

                <p>
                    <strong>Status:</strong>
                    ${application.status}
                </p>

                <div class="card-actions">

                    <button
                        class="edit-button"
                        onclick="editApplication('${application._id}')">
                        Edit
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteApplication('${application._id}')">
                        Delete
                    </button>

                </div>
            `;


            applicationsList.appendChild(
                card
            );
        }
    );
}


// ========================================
// DELETE APPLICATION
// ========================================

async function deleteApplication(id) {

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/applications/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete application"
            );
        }


        applications =
            applications.filter(
                function(application) {

                    return application._id !== id;
                }
            );


        renderApplications();

        updateDashboard();


    } catch (error) {

        console.error(
            "Error deleting application:",
            error
        );
    }
}


// ========================================
// EDIT APPLICATION
// ========================================

async function editApplication(id) {

    const application =
        applications.find(
            function(application) {

                return application._id === id;
            }
        );


    if (!application) {

        return;
    }


    const updatedApplication = {

        company:
            prompt(
                "Company Name:",
                application.company
            ),

        jobTitle:
            prompt(
                "Job Title:",
                application.jobTitle
            ),

        location:
            prompt(
                "Location:",
                application.location
            ),

        applicationDate:
            prompt(
                "Application Date:",
                application.applicationDate
            ),

        salary:
            prompt(
                "Salary:",
                application.salary
            ),

        status:
            prompt(
                "Status: Applied, Interview, Rejected, Offer",
                application.status
            )
    };


    if (
        !updatedApplication.company ||
        !updatedApplication.jobTitle
    ) {

        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:3000/api/applications/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedApplication
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to update application"
            );
        }


        const savedApplication =
            await response.json();


        const index =
            applications.findIndex(
                function(application) {

                    return application._id === id;
                }
            );


        applications[index] =
            savedApplication;


        renderApplications();

        updateDashboard();


    } catch (error) {

        console.error(
            "Error updating application:",
            error
        );
    }
}


// ========================================
// UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    const totalApplications =
        applications.length;


    const appliedCount =
        applications.filter(
            function(application) {

                return application.status === "Applied";
            }
        ).length;


    const interviewCount =
        applications.filter(
            function(application) {

                return application.status === "Interview";
            }
        ).length;


    const rejectedCount =
        applications.filter(
            function(application) {

                return application.status === "Rejected";
            }
        ).length;


    const offerCount =
        applications.filter(
            function(application) {

                return application.status === "Offer";
            }
        ).length;


    const dashboardCards =
        document.querySelectorAll(
            "#dashboard > div"
        );


    dashboardCards[0]
        .querySelector("p")
        .textContent =
            totalApplications;


    dashboardCards[1]
        .querySelector("p")
        .textContent =
            appliedCount;


    dashboardCards[2]
        .querySelector("p")
        .textContent =
            interviewCount;


    dashboardCards[3]
        .querySelector("p")
        .textContent =
            rejectedCount;


    dashboardCards[4]
        .querySelector("p")
        .textContent =
            offerCount;
}


// ========================================
// SEARCH EVENT
// ========================================

searchInput.addEventListener(
    "input",
    renderApplications
);


// ========================================
// STATUS FILTER EVENT
// ========================================

statusFilter.addEventListener(
    "change",
    renderApplications
);


// ========================================
// START APPLICATION
// ========================================

loadApplications();