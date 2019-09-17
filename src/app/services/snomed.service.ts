
import { Injectable } from '@angular/core';
import { Server } from './server.service';

@Injectable()
export class SnomedAPI {
    private branch = 'MAIN/SNOMEDCT-ES';

    constructor(private http: Server) {
        // this.http.setBaseURL('https://browser.ihtsdotools.org/snowstorm/snomed-ct/v2');
        // this.http.setBaseURL('https://snowstorn.msal.gov.ar');
        this.http.setBaseURL('http://localhost:8080');

    }

    // browser/MAIN/SNOMEDCT-ES/descriptions
    descriptions(text, semanticTag = null) {
        const url = `/browser/${this.branch}/descriptions`;
        const query: any = {
            term: text,
            conceptActive: true,
            active: true,
            limit: 50,
            languageCode: 'es',
            language: 'es',
        };
        if (semanticTag) {
            query.semanticTag = semanticTag;
        }
        return this.http.get(url, { params: query });
    }

    // [TODO]
    concept(conceptId) {
        const url = `/browser/${this.branch}/concepts/${conceptId}`;
        return this.http.get(url);
    }

    parents(conceptId) {
        const url = `/browser/${this.branch}/concepts/${conceptId}/parents`;
        return this.http.get(url, { params: { form: 'inferred' } });
    }

    children(conceptId) {
        const url = `/browser/${this.branch}/concepts/${conceptId}/children`;
        return this.http.get(url, { params: { form: 'inferred' } });
    }


    refset(conceptId, refSetId = null) {
        const url = `/browser/${this.branch}/members`;
        const query = {
            referencedComponentId: conceptId,
            refsetId: refSetId
        };
        return this.http.get(url, { params: query });
    }

    query(ecl, term = null) {
        const url = `/${this.branch}/concepts`;
        const query: any = {
            ecl
        };
        if (term) {
            query.term = term;
        }
        return this.http.get(url, { params: query });
    }

    // < 87342007 : 272741003 = 7771000
    mrcm(attributeId, termPrefix) {
        const url = `/mrcm/${this.branch}/attribute-values/${attributeId}`;
        return this.http.get(url, { params: { termPrefix } });
    }

}
