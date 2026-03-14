import { useNavigate } from "react-router-dom";
import {
  BriefcaseMedical,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  Pill,
  Building2,
  UserRound,
  Users,
  Server,
  Receipt,
  ShieldCheck,
  Ambulance,
  BedDouble,
  Landmark,
} from "lucide-react";
import ProfessionCard from "../components/ProfessionCard";
import { useEnquiry } from "../context/EnquiryContext";
import { professionLabels } from "../data/questions";

const iconMap = {
  doctor: Stethoscope,
  nurse: BriefcaseMedical,
  receptionist: ClipboardList,
  labTechnician: FlaskConical,
  pharmacist: Pill,
  hospitalAdministrator: Building2,
  patient: UserRound,
  generalUser: Users,
  itSystemAdministrator: Server,
  billingAccountsStaff: Receipt,
  insuranceTpaCoordinator: ShieldCheck,
  emergencyStaff: Ambulance,
  wardBedManagementStaff: BedDouble,
  hospitalOwnerManagement: Landmark,
};

const ProfessionPage = () => {
  const navigate = useNavigate();
  const { setProfession } = useEnquiry();

  const onSelect = (key) => {
    setProfession(key);
    navigate("/userinfo");
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-100 md:text-3xl">Select Your Profession</h2>
        <p className="mt-2 text-sm text-slate-300">Choose the role that best describes your hospital context.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(professionLabels).map(([key, label]) => (
          <ProfessionCard key={key} title={label} icon={iconMap[key]} onClick={() => onSelect(key)} />
        ))}
      </div>
    </div>
  );
};

export default ProfessionPage;
