export default class AcoOptions{
  alpha: number;
  beta: number;
  iterNum: number;
  antsNum: number;
  rho: number;
  q: number;
  
  static of(alpha,beta,iterNum,antsNum,rho,q){
    const options = new AcoOptions();
    options.alpha = alpha;
    options.beta = beta;
    options.iterNum = iterNum;
    options.antsNum = antsNum;
    options.rho = rho;
    options.q = q;
    return options;
  }
}
