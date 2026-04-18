import './About.css'
import founder from '../images/Founder/founder.jpg'
function About(){
    return(
        <>
        <div>
            <h1 className='align-center'>About Us</h1>
            <h4 className='align-center'>Home {'>'} About Us</h4>
        </div>
        <div className='top-margin'>
            <h2  className='align-center'>Our Story: Of Perseverance and Growth </h2>
            <p className="story">Uptownie is a homegrown womenswear brand with its roots in Kolkata, India. We design and manufacture clothes for Indian women, keeping in mind their preferences and</p> <p className="story">sensibilities. We prioritize customer feedback and use it to optimize the fit, fabric, and look of our designs. By paying keen attention to small details we make a big difference in</p><p className="story">our process of stitching beautiful end products. Our mission as an online contemporary fashion label is to empower Indian women with the liberty to dress comfortably,</p><p className="story">fashionably and authentically.</p>
        </div>
        <div className='top-margin'>
            <p className="story">Since the birth of Uptownie in 2015, we have connected with over 10 lakh customers. Today, our products have a nationwide presence and can be found on our website -</p><p className="story">www.uptownie.com as well as e-commerce stores such as Myntra, Jabong, Flipkart, Amazon, Nykaa Fashion, and Ajio. </p>
        </div>
        <div className='top-margin'>
            <h2  className='align-center'>Our Process: Of Simplicity and Sustainability</h2>
            <p className="story">We adopt global micro trends and design apparel, accessories, and footwear that align with the preferences of Indian women bearing in mind their height, weight, complexion,</p> <p className="story">figure, and body type. An Uptownie outfit is hands down the most fuss-free and frequently worn clothing in any wardrobe.</p><p className="story">Our quality is our strength. Our factory, in Ganganagar, West Bengal, runs on the simple principle of producing clothes that are durable, affordable, and fashionable. To keep up</p><p className="story">with the fast-moving trends, we update our online catalogues weekly and refresh them with a range of styles for every occasion. More importantly, each piece upholds the</p><p className='story'>promise of quality, comfort, and durability. Our work is certified by SGS - the world’s largest quality testing agency.</p>
        </div>
        <div className='founder-img'>
            <img src={founder} alt="founder" />
        </div>
        <div className='founder-detail'>
            <h1>Priyanka Agarwal</h1>
            <div className='staybombdiggity'><h2>stay.bomb.diggity</h2></div>
        </div>
        <div className='top-margin'>
            <h2  className='align-center'>Our Founder: Of Leadership and Strength</h2>
            <p className="story">Priyanka Agarwal is an entrepreneur and a fashion enthusiast with a keen eye for aesthetics, detail, and design. Uptownie was born out of her desire to empower Indian women with</p> <p className="story">affordable and fuss-free clothing that complements their body type and physicality. </p><p className="story">Priyanka graduated from Duke University with a Bachelor of Science (BSc) in Economics and Math, and a specialization in Marketing and Visual Arts. Her work at Uptownie is a blend of</p><p className="story">fortes gathered through her years as a student. She also draws upon 40 years of her family’s experience within the fields of manufacturing and exports, to bring perfection to the production</p><p className='story'>process.</p>
        </div>
        <div className='top-margin'>
            <p className="story">After 8 years of extensive experience working in the fashion industry, and churning out over 10,000 unique designs, Priyanka knows how a masterful play with colours, cuts, textures,</p><p className="story">patterns, and styles can bring out individuality and confidence in a woman. She endeavours to challenge beauty stereotypes and invites women from all over the country to join in an </p><p className='story'>unabashed celebration of their own bodies. She steers away from designing for the ramp, and uses her clothes as a medium to communicate with the women of today and give them a</p><p className='story'>chance to express their best selves. </p>
        </div>
        <div className='top-margin'>
            <h2  className='align-center'>Our Team: Of Passion and Fashion</h2>
            <p className="story">The driving force of the company is a team of young and urban Indian women who wear the shoes of our customers in every step of their way. We design fuss-free and chic clothes, keeping</p> <p className="story">in mind that no one has the time for endless ironing, slips, nips and tucks, shoulders that slip off, or unflattering cuts.</p>
        </div>
        <div className='top-margin'>
            <p className="story">Our digital store is run by 50 young men and women who work across all departments: from marketing and designing, to warehousing, with a gusto for growth. The Uptownie office is a</p><p className="story">space of equal opportunity and a conducive environment for tremendous growth in the field of  fashion.</p>
        </div>
        <div className='top-margin'>
            <p className="story">We envision a world where every body shape and size is celebrated. Your outfit is never “too bold” or “too well-fitted” or “too casual,” it is always a personal expression of your inner</p><p className="story">beauty. Scrolling through our store is never a hunt for what’s good, but always a tough pick between many great choices. </p>
        </div>
        </>
    )
}
export default About;