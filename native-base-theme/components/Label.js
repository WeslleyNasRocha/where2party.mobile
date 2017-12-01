import variable from './../variables/platform';

export default (variables = variable) => {
  const labelTheme = {
    '.focused': {
      width: 0
    },
    color: '#a7a7a7',
    fontSize: 17
  };

  return labelTheme;
};
