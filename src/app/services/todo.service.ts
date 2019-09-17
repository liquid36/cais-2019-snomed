
import { Injectable } from '@angular/core';
import { Server } from './server.service';
import { of } from 'rxjs';

@Injectable()
export class TODOSnomedAPI {
    private branch = 'MAIN/SNOMEDCT-ES';

    constructor(private http: Server) {
        this.http.setBaseURL('https://browser.ihtsdotools.org/snowstorm/snomed-ct/v2');
        // this.http.setBaseURL('https://snowstorn.msal.gov.ar');
        // this.http.setBaseURL('http://localhost:8080');

    }

    /**
     * [TODO] Completar la URL y los parametros de consulta
     * para buscar descripciones de conceptos.
     */

    descriptions(text, semanticTag = null) {
        const url = ``;
        const query: any = {
            term: '',
            conceptActive: true,
            active: true,
            limit: 50,
            languageCode: 'es',
            language: 'es',
        };
        if (semanticTag) {
        }
        return this.http.get(url, { params: query });
    }

    /**
     * [TODO] Completar con la URL de la consulta de descripción amplia de un concepto.
     * Para el browser.
     */

    concept(conceptId) {
        const url = ``;
        return this.http.get(url);
    }

    /**
     * [TODO] Completar con la URL para buscar los padres de un concepto
     */

    parents(conceptId) {
        const url = ``;
        return this.http.get(url, { params: { form: 'inferred' } });
    }

    /**
     * [TODO] Completar con la URL para buscar los hijos de un concepto
     */

    children(conceptId) {
        const url = ``;
        return this.http.get(url, { params: { form: 'inferred' } });
    }


    /**
     * [TODO] Completar con la URL para obtener los refereSet a los que pertenece un concepto.
     */

    refset(conceptId, refSetId = null) {
        const url = ``;
        const query = {
        };
        return this.http.get(url, { params: query });
    }

    /**
     * [TODO] Completar con la URL para realizar una Expression Constraint.
     */
    query(ecl, term = null) {
        const url = ``;
        const query: any = {

        };
        if (term) {

        }
        return this.http.get(url, { params: query });
    }

    mrcm(attributeId, termPrefix) {
        return of({ items: [] });
    }

}
