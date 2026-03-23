import DateUtils from "../utils/DateUtils";

function Footer() {
    return (
        <div className="absolute bottom-3 left-[50%] translate-x-[-50%] w-full p-5 text-center">
            <p className="font-semibold text-xs">&copy; Copyright {new DateUtils().currentYear()} VibeStream.</p>
        </div>
    );
}

export default Footer;