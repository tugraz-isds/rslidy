function respvis_bar_chart () {
  const data = {
    sites: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'],
    years: ['2020-08', '2021-02', '2021-08'],
    revenues: [
      [65.99, 63.54, 64.94],
      [16.82, 19.14, 18.75],
      [4.09, 3.76, 3.55],
      [2.30, 3.41, 3.55],
      [2.09, 2.19, 2.17],
    ],
  };

  const sites = data.sites,
    siteScale = respVis.bandScale().padding(0.1),
    revenues = data.revenues,
    maxRevenue = Math.max(...revenues.flat()),
    revenueScale = respVis.linearScale().domain([0, maxRevenue]).nice(),
    revenueFormatter = (value) => `${value}\%`,
    years = data.years,
    keys = revenues.map((yearlyRevs, i) => yearlyRevs.map((_, j) => sites[i] + years[j])),
    wideMediaQuery = 'screen and (min-width: 40rem)',
    barColors = respVis.GroupedBarsComponent.defaultColors;

  // needed to toggle years
  let yearToggles = [true, true, true],
    filteredBarColors = barColors;

  const chart = respVis.chart(),
    root = chart.root().layout('margin-horizontal', 20).layout('margin-top', 20);

  const barChart = respVis
      .groupedBarChart()
      .mainValues(sites)
      .mainScale(siteScale)
      .mainTitle('Share')
      .crossValues(revenues)
      .crossScale(revenueScale)
      .crossTitle('Percent')
      .keys(keys),
    bars = barChart
      .bars()
      .onUpdateBars((selection) => respVis.updateGroupedBars(selection, filteredBarColors))
      .on('mouseover', (e, d) => hoverBar(d.mainIndex, d.crossIndex, true))
      .on('mouseout', (e, d) => hoverBar(d.mainIndex, d.crossIndex, false)),
    drawArea = barChart.drawArea();
  root.child('bar-chart', barChart);

  const barLabels = respVis
    .barLabels(() =>
      bars
  .barData()
  .flat()
  .map((bD) => bD.rect)
    )
    .labels(revenues.flat().map(revenueFormatter))
    .attr('pointer-events', 'none')
    .attr('font-size', 0);
  drawArea.child('bar-labels', barLabels);

  const legend = respVis
    .legend(years.length)
    .attr('cursor', 'default')
    .on('mouseover', (event, data) => hoverLegendSwatch(data.childIndex, true))
    .on('mouseout', (event, data) => hoverLegendSwatch(data.childIndex, false))
    .on('click', (event, data) => clickLegendSwatch(data.childIndex))
    .layout('place-content', 'start end')
    .call((legend) =>
      legend.swatches().forEach((swatch, i) => {
  swatch.rect().attr('fill', barColors[i]);
  swatch.label().text(years[i]);
      })
    );
  root.child('legend', legend);

  barChart
    .configurator(0, (bC) => {
      root.layout('grid-template', 'auto 1fr / 1fr');
      bC.layout('grid-area', '2 / 1 / 3 / 2')
  .orientation(respVis.BarOrientation.Horizontal)
  .call(configureBarChartAxes);
      barLabels.call(configureHorizontalBarLabels);
      legend
  .layout('grid-area', '1 / 1 / 2 / 2')
  .layout('margin-bottom', 10)
  .layout('margin-left', 0)
  .rowCount(1)
  .columnCount(years.length);
    })
    .mediaQueryConfigurator(1, wideMediaQuery, (bC) => {
      root.layout('grid-template', '1fr / 1fr auto');
      bC.layout('grid-area', '1 / 1 / 2 / 2')
  .orientation(respVis.BarOrientation.Vertical)
  .call(configureBarChartAxes);
      barLabels.call(configureVerticalBarLabels);
      legend
  .layout('grid-area', '1 / 2 / 2 / 3')
  .layout('margin-bottom', 0)
  .layout('margin-left', 10)
  .rowCount(years.length)
  .columnCount(1);
    });

  chart.mount('#responsive-bar-chart');

  function configureHorizontalBarLabels(barLabels) {
    barLabels
      .widthPercent(0)
      .heightPercent(0.5)
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'start')
      .attr('transform', 'translate(4, 0)');
  }

  function configureVerticalBarLabels(barLabels) {
    barLabels
      .widthPercent(0.5)
      .heightPercent(1)
      .attr('dominant-baseline', 'auto')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(0, -4)');
  }

  function configureBarChartAxes(barChart) {
    barChart
      .mainAxis()
      .ticks()
      .attr('cursor', 'default')
      .onConfigureAxis((axis) => {})
      .on('mouseover', (event, data) => hoverMainAxisTick(data.tickIndex, true))
      .on('mouseout', (event, data) => hoverMainAxisTick(data.tickIndex, false));

    barChart
      .crossAxis()
      .ticks()
      .attr('cursor', 'auto')
      .onConfigureAxis((axis) => axis.tickFormat(revenueFormatter).ticks(5))
      .on('mouseover', null)
      .on('mouseout', null);
  }

  function legendSwatchIndexToBarIndex(swatchIndex) {
    return yearToggles.slice(0, swatchIndex).filter((t) => t).length;
  }

  function barIndexToRevenueIndex(barIndex) {
    let lastIndex = -1;
    for (let i = 0; i <= barIndex; ++i) lastIndex = yearToggles.indexOf(true, lastIndex + 1);
    return lastIndex;
  }

  function nthOfType(index) {
    return `:nth-of-type(${index + 1})`;
  }

  function highlightBar(categoryIndex, barIndex, highlight) {
    const c = filteredBarColors[barIndex];
    bars
      .select(`.bar-group${nthOfType(categoryIndex)} rect${nthOfType(barIndex)}`)
      .attr('fill', highlight ? respVis.brighten(c, 0.5) : c);
  }

  function highlightMainAxisTick(tickIndex, highlight) {
    barChart
      .mainAxis()
      .select(`.tick${nthOfType(tickIndex)}`)
      .attr('text-decoration', highlight ? 'underline' : null);
  }

  function highlightLegendSwatch(swatchIndex, highlight) {
    const c = barColors[swatchIndex];
    const swatch = legend.swatches()[swatchIndex];
    swatch.rect().attr('fill', highlight ? respVis.brighten(c, 0.5) : c);
    swatch.label().attr('text-decoration', highlight ? 'underline' : null);
  }

  function disableLegendSwatch(swatchIndex, disable) {
    const c = barColors[swatchIndex];
    const swatch = legend.swatches()[swatchIndex];
    swatch.rect().attr('fill', disable ? respVis.desaturate(c, 4) : c);
    swatch.label().attr('fill', disable ? '#ababab' : null);
  }

  function showLabel(labelIndex, show) {
    barLabels.select(`text${nthOfType(labelIndex)} `).attr('font-size', show ? '1rem' : null);
  }

  function hoverBar(categoryIndex, barIndex, hover) {
    const flatBarIndex = categoryIndex * yearToggles.filter((t) => t).length + barIndex;
    highlightBar(categoryIndex, barIndex, hover);
    showLabel(flatBarIndex, hover);
    highlightMainAxisTick(categoryIndex, hover);
    highlightLegendSwatch(barIndexToRevenueIndex(barIndex), hover);
  }

  function hoverMainAxisTick(tickIndex, hover) {
    highlightMainAxisTick(tickIndex, hover);
    const yearCount = yearToggles.filter((t) => t).length;
    for (let i = 0; i < yearCount; ++i) {
      const flatBarIndex = tickIndex * yearCount + i;
      highlightBar(tickIndex, i, hover);
      showLabel(flatBarIndex, hover);
    }
  }

  function hoverLegendSwatch(swatchIndex, hover) {
    if (yearToggles[swatchIndex] === false) return;

    highlightLegendSwatch(swatchIndex, hover);
    const yearCount = yearToggles.filter((t) => t).length;
    sites.forEach((site, siteIndex) => {
      let barIndex = legendSwatchIndexToBarIndex(swatchIndex);
      const flatBarIndex = siteIndex * yearCount + barIndex;
      highlightBar(siteIndex, barIndex, hover);
      showLabel(flatBarIndex, hover);
    });
  }

  function clickLegendSwatch(swatchIndex) {
    // Prevent hiding the last subcategory
    if (yearToggles.filter((t) => t).length === 1 && yearToggles[swatchIndex] === true) return;

    hoverLegendSwatch(swatchIndex, false);
    yearToggles[swatchIndex] = !yearToggles[swatchIndex];
    disableLegendSwatch(swatchIndex, !yearToggles[swatchIndex]);

    const newRevs = revenues.map((yearlyRevs) => yearlyRevs.filter((_, i) => yearToggles[i]));
    const newKeys = keys.map((yearlyKeys) => yearlyKeys.filter((_, i) => yearToggles[i]));
    bars.crossValues(newRevs).keys(newKeys);

    filteredBarColors = barColors.filter((c, i) => yearToggles[i]);

    barLabels.labels(newRevs.flat().map(revenueFormatter));

    chart.transition();
  }
}

respvis_bar_chart();
