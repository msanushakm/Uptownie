import './Size.css'
import size from '../images/size/size.png'
function Size(){
    return(
        <>
        <div className="maiNN">
            <h1>Size Chart</h1>
            <h3>PLEASE USE THE CHART BELOW TO DECIDE WHICH SIZE TO ORDER</h3>
            <p>If you would like more specific information on the sizing on a particular garment, please contact Customer Care with your questions.</p>
        </div>
        <div className="flex">
        <div className="text">
        <h1>How to measure yourself</h1>
        <h5>BUST</h5>
        <p>For an accurate measurement, measure your chest over the fullest part of your bust.</p>
        <h5>WAIST</h5>
        <p>Measure around the narrowest point of your waist.</p>
        <h5>HIPS</h5>
        <p>Measure at the fullest part of your hips while standing with your heels together.</p>
        </div>
        <div className="chart">
        <img src={size} alt="size" />
        </div>
        </div>
        </>
    )
}
export default Size;