import moment from 'moment';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
  }

  return initials.toUpperCase();
};


export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  
  if (!data || data.length === 0) {
    return [];
  }

  try {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
      month: moment(item.date).format("Do MMM"),
      amount: item.amount,
      source: item.source,
    }));
    
    return chartData;
  } catch (error) {
    console.error('Error preparing income bar chart data:', error, data);
    return [];
  }
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!data || data.length === 0) {
    return [];
  }

  try {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
      month: moment(item.date).format("Do MMM"),
      amount: item.amount,
      category: item.category,
    }));
    
    return chartData;
  } catch (error) {
    console.error('Error preparing expense line chart data:', error, data);
    return [];
  }
};