exports.order = function order(input, onResult) {
  const prices = input.prices;
  const quantities = input.quantities;
  const country = input.country;
  const reduction = input.reduction;

  const initial_sum = compute_initial_sum(prices, quantities);
  const c_tax = country_tax(country);
  const sum_after_tax = initial_sum * (1 + c_tax);
  const reduction_tax = compute_reduction_tax(sum_after_tax);
  const sum_after_reduction = sum_after_tax * (1 - reduction_tax);

  let result_content =0;
  if (reduction === 'STANDARD') {
    result_content =sum_after_reduction;
  } else if (reduction === 'PAY THE PRICE') {
    result_content = sum_after_tax
  } 
  onResult(null, result_content);
}



function compute_initial_sum(prices, quantities) {
  var i = 0;
  var sum = 0;
  prices.forEach(price => {
    sum += price * quantities[i];
    i++;
  });
  return sum;
}

function compute_reduction_tax(amount) {
  if (amount >= 50000) {
    return 0.15;
  }
  if (amount >= 10000) {
    return 0.1;
  }
  if (amount >= 7000) {
    return 0.07;
  }
  if (amount >= 5000) {
    return 0.05;
  }
  if (amount >= 1000) {
    return 0.03;
  }
  return 0;
}

function country_tax(country) {
  var country_codes = {
    "DE": 0.20,
    "UK": 0.21,
    "FR": 0.20,
    "IT": 0.25,
    "ES": 0.19,
    "PL": 0.21,
    "RO": 0.20,
    "NL": 0.20,
    "BE": 0.24,
    "EL": 0.20,
    "CZ": 0.19,
    "PT": 0.23,
    "HU": 0.27,
    "SE": 0.23,
    "AT": 0.22,
    "BG": 0.21,
    "DK": 0.21,
    "FI": 0.17,
    "SK": 0.18,
    "IE": 0.21,
    "HR": 0.23,
    "LT": 0.23,
    "SI": 0.24,
    "LV": 0.20,
    "EE": 0.22,
    "CY": 0.21,
    "LU": 0.25,
    "MT": 0.20
  };
  return country_codes[country];

}
