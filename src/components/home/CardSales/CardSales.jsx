import mastercard from "./ImagenesCard/mastercard.png"
import mp from "./ImagenesCard/mp.png"
import visa from "./ImagenesCard/visa.jpg"

export function CardSales(){
  const cardSaleArray = [
    {
      _id: "1",
      photo:mastercard,
      desription:"Place your order on the day of your choice and schedule your delivery for Monday.",
      procentaje:"%25"
    },
    {
      _id: "2",
      photo:visa,
      desription:"Place your order on the day you prefer and schedule your delivery for Friday with your Mastercard.",
      procentaje:"%20"
    },
    {
      _id: "3",
      photo:mp,
      desription:"Make your purchases on Wednesdays and schedule your delivery for the day of your choice.",
      procentaje:"%15"
    }
  ]
  return (
    <div className="w-11/12 flex flex-col justify-center items-center lg:flex-row gap-3 my-6">
    {cardSaleArray.map(card =>(
      <div className="lg:w-1/3 w-2/3 bg-white min-h-[180px] flex items-center justify-center gap-3 border rounded-lg" key={card._id}>
        <img src={card.photo} alt="" className="w-1/5 " />
        <div className="w-3/5 text-sm">{card.desription}</div>
        <div className="w-1/5 font-bold text-lg flex flex-col items-center">{card.procentaje}<span className="text-sm font-light underline text-center p-1">Legals</span></div>
    </div>
    ))}
    
   </div>
  )
}

