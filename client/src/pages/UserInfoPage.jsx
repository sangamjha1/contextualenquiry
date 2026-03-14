import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEnquiry } from "../context/EnquiryContext";
import { professionLabels } from "../data/questions";

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { state, setUserDetails } = useEnquiry();
  const [name, setName] = useState(state.name || "");
  const [identity, setIdentity] = useState(state.identity || "");
  const [workplace, setWorkplace] = useState(state.workplace || "");

  const identityOptions = [
    "Staff Member",
    "Student / Trainee",
    "Visitor / Caregiver",
    "Prefer not to say",
  ];

  const workplaceOptionsByProfession = {
    doctor: [
      "Government hospital",
      "Private hospital",
      "Clinic / OPD",
      "Teaching hospital",
      "Other",
    ],
    nurse: [
      "Government hospital",
      "Private hospital",
      "Clinic / OPD",
      "Teaching hospital",
      "Other",
    ],
    receptionist: [
      "OPD front desk",
      "IPD admissions",
      "Emergency reception",
      "Billing desk",
      "Other",
    ],
    labTechnician: [
      "Hospital lab",
      "Diagnostic center",
      "Pathology lab",
      "Blood bank",
      "Other",
    ],
    pharmacist: [
      "Hospital pharmacy",
      "Retail pharmacy",
      "IPD ward pharmacy",
      "Central store",
      "Other",
    ],
    hospitalAdministrator: [
      "Single hospital",
      "Multi-hospital group",
      "Corporate HQ",
      "Medical college hospital",
      "Other",
    ],
    patient: [
      "Visited public hospital",
      "Visited private hospital",
      "Clinic / OPD",
      "Emergency visit",
      "Other",
    ],
    generalUser: [
      "Visited public hospital",
      "Visited private hospital",
      "Clinic / OPD",
      "Emergency visit",
      "Other",
    ],
    itSystemAdministrator: [
      "Hospital IT department",
      "Multi-hospital IT",
      "Clinic IT",
      "Diagnostic center IT",
      "Other",
    ],
    billingAccountsStaff: [
      "Billing desk",
      "Insurance desk",
      "Corporate billing",
      "Accounts office",
      "Other",
    ],
    insuranceTpaCoordinator: [
      "Hospital TPA desk",
      "Insurer office",
      "Third-party administrator",
      "Broker / facilitator",
      "Other",
    ],
    emergencyStaff: [
      "Emergency department",
      "Trauma center",
      "Ambulance team",
      "ICU / critical care",
      "Other",
    ],
    wardBedManagementStaff: [
      "Bed management office",
      "Ward nurse station",
      "Admission / discharge desk",
      "Housekeeping coordination",
      "Other",
    ],
    hospitalOwnerManagement: [
      "Single hospital",
      "Hospital group",
      "Specialty hospital",
      "Clinic chain",
      "Other",
    ],
  };

  const workplaceOptions =
    workplaceOptionsByProfession[state.profession] || [
      "Hospital",
      "Clinic / OPD",
      "Diagnostic center / lab",
      "Pharmacy",
      "Other",
    ];

  useEffect(() => {
    if (workplace && !workplaceOptions.includes(workplace)) {
      setWorkplace("");
    }
  }, [workplace, workplaceOptions]);

  if (!state.profession) {
    return <Navigate to="/profession" replace />;
  }

  const submit = (event) => {
    event.preventDefault();
    setUserDetails(name.trim(), identity, workplace.trim());
    navigate("/questions");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-10">
      <form onSubmit={submit} className="card-surface w-full rounded-3xl border border-slate-700/60 p-8 shadow-soft">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">{professionLabels[state.profession]}</p>
        <h2 className="mb-6 text-2xl font-bold text-slate-100">Select your details</h2>

        <label className="mb-2 block text-sm text-slate-200" htmlFor="fullName">
          Full Name
        </label>
        <input
          id="fullName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-5 w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
          placeholder="Enter your full name"
          required
        />

        <label className="mb-2 block text-sm text-slate-200" htmlFor="identity">
          Identity
        </label>
        <select
          id="identity"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          className="mb-5 w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
          required
        >
          <option value="">Select one</option>
          {identityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label className="mb-2 block text-sm text-slate-200" htmlFor="workplace">
          Workplace Type
        </label>
        <select
          id="workplace"
          value={workplace}
          onChange={(e) => setWorkplace(e.target.value)}
          className="mb-6 w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-sm outline-none ring-primary transition focus:ring-2"
          required
        >
          <option value="">Select one</option>
          {workplaceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!name.trim() || !identity || !workplace}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default UserInfoPage;
