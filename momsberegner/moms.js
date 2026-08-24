function beregnMoms(beløb, moms = 25) {
  const momsBeløb = (beløb * moms) / 100;

  const resultat = beløb + momsBeløb;

  console.log(resultat);
}

beregnMoms(500);
