export function getOrderDetailsById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        id,
        amount: 500,
      });
    }, 2000);
  })
}

export default { getOrderDetailsById };
