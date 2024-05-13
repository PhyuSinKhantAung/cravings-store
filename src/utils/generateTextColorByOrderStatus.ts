function generateTextColorByOrderStatus(status: string) {
  let textColor = "";
  switch (status) {
    case "CANCELED":
      textColor = "text-red-600";
      break;
    case "DELIVERY":
      textColor = "text-yellow-600";
      break;
    case "COMPLETED":
      textColor = "text-green-600";
      break;
    default:
      textColor = "text-accent";
  }
  return textColor;
}

export default generateTextColorByOrderStatus;
