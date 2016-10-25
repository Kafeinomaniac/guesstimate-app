import {jStat} from 'jstat'
import Sampling from 'discrete-sampling'

import {SAMPLE_FILTERED} from '../evaluator'

const bernoulli = p => Sampling.Bernoulli(p).draw()
const binomial = (n, p) => Sampling.Binomial(n,p).draw()
const poisson = (lambda) => Sampling.Poisson(lambda).draw()
const negBinomial = (r, p) => Sampling.NegBinomial(r, p).draw()

function filteredNormal(mu, sigma, min = -Infinity, max = Infinity) {
  const r = jStat.normal.sample(mu, sigma)
  return r <= min || r >= max ? SAMPLE_FILTERED : r
}

export const Distributions = {
  beta: jStat.beta.sample,
  centralF: jStat.centralF.sample,
  cauchy: jStat.cauchy.sample,
  chisquare: jStat.chisquare.sample,
  exponential: jStat.exponential.sample,
  invgamma: jStat.invgamma.sample,
  lognormal: jStat.lognormal.sample,
  normal: jStat.normal.sample,
  studentt: jStat.studentt.sample,
  weibull: jStat.weibull.sample,
  uniform: jStat.uniform.sample,
  gamma: jStat.gamma.sample,
  bernoulli: bernoulli,
  test: bernoulli,
  binomial: binomial,
  poisson: poisson,
  negBinomial: negBinomial,
  filteredNormal,
}
