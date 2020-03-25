document.addEventListener("DOMContentLoaded", () => {
    function getMixtureObj(
        nicotine,
        nicotine_strength,
        aroma,
        propylenglykol,
        glycerol
    ) {
        return {
            nicotine: nicotine,
            nicotine_strength: nicotine_strength,
            aroma: aroma,
            propylenglykol: propylenglykol,
            glycerol: glycerol
        };
    }

    function calculateMeta(mixture) {
        const total = [
            mixture.nicotine,
            mixture.aroma,
            mixture.propylenglykol,
            mixture.glycerol
        ].reduce((acc, val) => acc + val, 0);

        const total_pg = mixture.propylenglykol;
        const total_vg = mixture.glycerol + mixture.nicotine;

        const pct_pg = Math.round((total_pg / total) * 100);
        const pct_vg = Math.round((total_vg / total) * 100);
        const str_nct = Math.round(
            (mixture.nicotine * mixture.nicotine_strength) / total
        );
        const pct_ar = Math.round((mixture.aroma / total) * 100);

        return {
            total: total,
            pct_pg: pct_pg,
            pct_vg: pct_vg,
            str_nct: str_nct,
            pct_ar: pct_ar
        };
    }

    function getValuesFromInputs(name) {
        return document.getElementById(name).value;
    }

    function updateInputs(mixture) {
        document.querySelectorAll("input").forEach(input => {
            input.value = mixture[input.name];
        });
    }

    function updateMeta(meta_data) {
        Object.keys(meta_data).forEach((k, i) => {
            document.getElementById(k).innerText = meta_data[k];
        });
    }

    function run() {
        const nicotine = Number.parseInt(getValuesFromInputs("nicotine"));
        const nicotine_strength = Number.parseInt(
            getValuesFromInputs("nicotine_strength")
        );
        const aroma = Number.parseInt(getValuesFromInputs("aroma"));
        const propylenglykol = Number.parseInt(
            getValuesFromInputs("propylenglykol")
        );
        const glycerol = Number.parseInt(getValuesFromInputs("glycerol"));

        const mixture = getMixtureObj(
            nicotine,
            nicotine_strength,
            aroma,
            propylenglykol,
            glycerol
        );
        const meta_data = calculateMeta(mixture);
        updateMeta(meta_data);
    }

    document.querySelectorAll("input").forEach(input =>
        input.addEventListener("input", () => {
            run(nicotine, nicotine_strength, aroma, propylenglykol, glycerol);
        })
    );

    let init_mix = getMixtureObj(80, 20, 10, 50, 60);
    updateInputs(init_mix);
    run();
});
