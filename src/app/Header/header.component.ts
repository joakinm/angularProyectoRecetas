import { Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import {Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class headerComponent implements OnInit, OnDestroy {
    private readonly base = 999999;

    private userSub: Subscription;
    logueado = false;
    constructor(private store: Store<fromApp.AppState>) {}
    
    ngOnInit() {
       this.userSub = this.store.select('auth')
       .pipe(map(authState => {
        return authState.user;
        }))
        .subscribe(
           user =>{
               this.logueado = !!user;// lo mismo que usar (!user ? false : true;)
       });
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
    onGuardarDatos(){
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }
    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }

    public execFunction(num: number) {
        const licenceGenerated: string = this.getLicensePlate( Number.MAX_SAFE_INTEGER);
        console.log(licenceGenerated);
    }
    
    // public getLicensePlate(licenceNumber: number): string {
    //     const maxLetters = 6;
    //     const base = 99999; 

    //     let cumulativeTotals = base;
    //     for (let i = 1; i <= maxLetters; i++) {
    //         cumulativeTotals += Math.pow(26, i) * base;
    //     }
        
    //     if (licenceNumber > cumulativeTotals) {
    //         return 'ZZZZZZ';      // if exceeds the max, it throws an ZZZZZZ
    //     }
        
    //     let lettersLength = 0;
    //     let totalCombinations = base;

    //     while (licenceNumber > totalCombinations) {
    //         lettersLength++;
    //         totalCombinations += Math.pow(26, lettersLength) * base;
    //     }
        
    //     const prevTotal = totalCombinations - Math.pow(26, lettersLength) * base;
    //     let offset = licenceNumber - prevTotal - 1;
        
    //     const lettersNumber = Math.floor(offset / base);
    //     const lettersStr = this.numToLetter(lettersNumber + 1);
        
    //     // Pad letters to fixed length of maxLetters, which is 6
    //     const lettersFinal = lettersStr.padStart(maxLetters, 'A');
        
    //     // Return only the letters part as we are focusing on 'ZZZZZZ'
    //     return lettersFinal;
    // }
    
    // private numToLetter(num: number): string {
    //     let letters = '';
    //     while (num > 0) {
    //         num -= 1;
    //         letters = String.fromCharCode(65 + (num % 26)) + letters;
    //         num = Math.floor(num / 26);
    //     }
    //     return letters;
    // }
    
    public getLicensePlate(n: number): string {
        const segmentSizes = [
            1e6,          // k=0: 000000 to 999999 (1,000,000 plates)
            26e5,         // k=1: 00000A to 99999Z (260,000 plates)
            26**2 * 1e4,  // k=2: 0000AA to 9999ZZ (6,760,000 plates)
            26**3 * 1e3,  // k=3: 000AAA to 999ZZZ (17,576,000 plates)
            26**4 * 1e2,  // k=4: 00AAAA to 99ZZZZ (45,697,600 plates)
            26**5 * 10,   // k=5: 0AAAAA to 9ZZZZZ (118,813,760 plates)
            26**6          // k=6: AAAAAA to ZZZZZZ (308,915,776 plates)
        ];
    
        let cum = 0;
        let k: number;
        for (k = 0; k < segmentSizes.length; k++) {
            const size = segmentSizes[k];
            if (n < cum + size) {
                break;
            }
            cum += size;
        }
    
        const offset = n - cum;
        const digitsLength = 6 - k;
        const divisor = 10 ** digitsLength;
        const lettersIndex = Math.floor(offset / divisor);
        const numericPartValue = offset % divisor;
    
        const numericPartStr = numericPartValue.toString().padStart(digitsLength, '0');
        const lettersPart = this.numberToLetters(lettersIndex, k);
    
        return numericPartStr + lettersPart;
    }
    
    public numberToLetters(n: number, length: number): string {
        if (length === 0) return '';
        let letters: string[] = [];
        let remaining = n;
        for (let i = 0; i < length; i++) {
            const remainder = remaining % 26;
            letters.push(String.fromCharCode(65 + remainder)); // 'A' is 65
            remaining = Math.floor(remaining / 26);
        }
        return letters.reverse().join('');
    }
}