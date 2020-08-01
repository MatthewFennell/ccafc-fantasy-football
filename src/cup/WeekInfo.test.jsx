import React from 'react';
import { shallow } from '../enzyme';
import WeekInfo from './WeekInfo';

describe('Cup - Week Info', () => {
    const byes = [
        'T7i9ENpnwOWYdfV59iQTmGQrG2C3',
        'xs4BDOlU2Ld8OTjEHOpkBZ9Uf5z1',
        '0aXVptp8KqOccnCw52A2LqP5vWs2',
        'HfUv3FFRJTMIuk7JXoTsNda7Gkc2',
        'Cc543V9cmXd1EPhwaBSkQg16QYy2',
        'mIzcYPbpXddjffB42iiWATCdMyp1',
        'ziogi87uZPO4GLdrOy8sgHqjaNF2',
        'HIQOpWA5E6MV4BdoCTdPmW7VE4f2',
        'KxmYyvDFVLQbP9yjcaJAHnj027x1',
        'IrLsvrpKL8aSNV6f4oZGXoyGnU82',
        'CnRz7fTqSaNz6JPGVOgC4HciFHV2',
        '6nPZE6SHWiU4mYM7kzClvFNT3VC2',
        'dxoz15O3fngkuJDFcEGXEhD4hfl1',
        '824fA5dhUcb3pnoU4sSPcQvba832',
        'MRqGLRqh9ZdptCbeEDAJk0EgEL63',
        'IcNMvovVRJdasonke4mhogB9OIk2',
        'fmLNZXDj2iOVhcuRWWCz8tAlLNw2',
        'ysN9HlSpEbY3bNhhRRj8o6tO36v2',
        'DgyAdJgopgYPFJxtaHJkD1xJEM83',
        'IwbKtfqoO9bGtgMSTxkh47bQcki2',
        '5fsvx5UfywS66pAgsGrrZuUsmsu1',
        '2ncLyF7w3JR4mMBbVHYwk4KMF0C2',
        '31Q4ai6oGBdFOb73lfHGIaaotq52',
        'suZCYvMChRPtC1t9ByfngiVsJAw1',
        'ok4hSEXd37WehtsvK8yfjdKq9mm1'
    ];

    const displayNameMappings = {
        to25BOQgtWTPsuJ3p3UHWCMeX8Q2: 'Samantha Alebibbgffggb McDonaldescu',
        ysN9HlSpEbY3bNhhRRj8o6tO36v2: 'Joe Alebfaifibeaj Lauescu',
        ziogi87uZPO4GLdrOy8sgHqjaNF2: 'Ruth Alebgfgehefjf Valtchanovsky',
        bAgfGbP9XQQLRCNSTaxn46q2s412: 'Betty Alebfjdegcjij Smithstein',
        QDq6ySs36zN5snsF5djN3MPA3Jb2: 'Tyler Alebibedjffhc Vijayvergiyastein',
        '0aXVptp8KqOccnCw52A2LqP5vWs2': 'Elizabeth Alebgjhhghbbj Vijayvergiyaman',
        IwbKtfqoO9bGtgMSTxkh47bQcki2: 'Bob Alebhadihbifd Wongberg',
        '5fsvx5UfywS66pAgsGrrZuUsmsu1': 'Emma Alebhgijhiebi Adeagbostein',
        YHE6Odz1XvXPHSeECBB1wdEX1Pw2: 'Ullrich Aldfdjiaiiijc Huisky',
        C7asBCxMZtcR7o4v8Z9QaOAL5bt2: 'Emily Alebfeeijajei Schrockstein',
        DgyAdJgopgYPFJxtaHJkD1xJEM83: 'Matthew Alebicbgbfagj Moiduberg',
        '31Q4ai6oGBdFOb73lfHGIaaotq52': 'Betty Alebiebeeebda Qinman',
        AwvUxtXkIHYI09Mla7A8F87dSbB3: 'Matthew Fennell',
        KxmYyvDFVLQbP9yjcaJAHnj027x1: 'Richard Alebfegcgjief Fallerwitz',
        zK3axitMq3ciQyDxTxpcqSsB8g12: 'Noah Alebgjceihfjc Liangwitz',
        mIzcYPbpXddjffB42iiWATCdMyp1: 'Matthew Alebgbjgeggdh Alisonstein',
        fmLNZXDj2iOVhcuRWWCz8tAlLNw2: 'Samantha Alecjaiaebbje Okelolawitz',
        MRqGLRqh9ZdptCbeEDAJk0EgEL63: 'Ethan Alebfgfeiigeb Okelolasen',
        hb9qdaJA9COHxdMAVkkzB3er0Fs2: 'Nancy Aleckidcbebh Zamorestein',
        xs4BDOlU2Ld8OTjEHOpkBZ9Uf5z1: 'Emily Aleckbaabgfe Martinazzistein',
        IrLsvrpKL8aSNV6f4oZGXoyGnU82: 'Betty Alebgibaechje Fergieman',
        CnRz7fTqSaNz6JPGVOgC4HciFHV2: 'Olivia Alebhajdhcbag Smithescu',
        '2ncLyF7w3JR4mMBbVHYwk4KMF0C2': 'Lisa Alebhhajficjd Putnamsen',
        ok4hSEXd37WehtsvK8yfjdKq9mm1: 'Lisa Alebehfdhdacd Changson',
        cvZr4yxXzDe0AgDxxKGMJCFD6qh2: 'Christopher Alebfghhgidhb Wongsky',
        suZCYvMChRPtC1t9ByfngiVsJAw1: 'Isabella Alebhicifhfcb Putnamson',
        Cc543V9cmXd1EPhwaBSkQg16QYy2: 'Matthew Alecjcaffaffi Chengsen',
        dxoz15O3fngkuJDFcEGXEhD4hfl1: 'Noah Alebihdagccbi Seligsteinson',
        '824fA5dhUcb3pnoU4sSPcQvba832': 'Donna Alebfhgfiibji Occhinoescu',
        PX9wPNdWBpVrJRkDpcVmOwza0Cq2: 'Patricia Alebheifhjcgj Wongsen',
        HIQOpWA5E6MV4BdoCTdPmW7VE4f2: 'Maria Alebfadgabfcj Seligsteinstein',
        '6nPZE6SHWiU4mYM7kzClvFNT3VC2': 'Bob Alecjadagbdah Dinglesky',
        IcNMvovVRJdasonke4mhogB9OIk2: 'Richard Alebifagfcife Chengberg',
        GjTUmSZHJzP1SxNqbGED7DPeOKx2: 'William Alebhfedakcj Lisen',
        '27YTdGXm89V2bzAeIhq1yRIO89q2': 'Richard Alebgjdfdhfjg Lausen',
        HfUv3FFRJTMIuk7JXoTsNda7Gkc2: 'Nancy Alecjfabdkcg Carrieroescu',
        rt7zYwrKdLPV5CaJYEXr2VSECio1: 'Ruth Alebhgfhfidhf Panditsen',
        T7i9ENpnwOWYdfV59iQTmGQrG2C3: 'Dave Alebehfbgdadj Rosenthalman',
        AuA5gFXseBQj4DgCHvu0kPlBhYG2: 'Daniel Alebgcddigabg Yangman'
    };

    const pairings = [
        {
            playerTwoId: 'PX9wPNdWBpVrJRkDpcVmOwza0Cq2',
            playerTwoScore: 95,
            playerOneScore: 71,
            playerOneId: 'QDq6ySs36zN5snsF5djN3MPA3Jb2'
        },
        {
            playerTwoId: 'hb9qdaJA9COHxdMAVkkzB3er0Fs2',
            playerOneScore: 119,
            playerOneId: 'cvZr4yxXzDe0AgDxxKGMJCFD6qh2',
            playerTwoScore: 127
        },
        {
            playerTwoId: 'AwvUxtXkIHYI09Mla7A8F87dSbB3',
            playerTwoScore: 129,
            playerOneScore: 124,
            playerOneId: 'rt7zYwrKdLPV5CaJYEXr2VSECio1'
        },
        {
            playerTwoScore: 19,
            playerOneId: '27YTdGXm89V2bzAeIhq1yRIO89q2',
            playerOneScore: 99,
            playerTwoId: 'T7i9ENpnwOWYdfV59iQTmGQrG2C3'
        },
        {
            playerOneId: 'xs4BDOlU2Ld8OTjEHOpkBZ9Uf5z1',
            playerTwoId: '0aXVptp8KqOccnCw52A2LqP5vWs2',
            playerTwoScore: 31,
            playerOneScore: 29
        },
        {
            playerTwoId: 'Cc543V9cmXd1EPhwaBSkQg16QYy2',
            playerOneScore: 35,
            playerTwoScore: 49,
            playerOneId: 'HfUv3FFRJTMIuk7JXoTsNda7Gkc2'
        },
        {
            playerTwoId: 'ziogi87uZPO4GLdrOy8sgHqjaNF2',
            playerOneId: 'mIzcYPbpXddjffB42iiWATCdMyp1',
            playerOneScore: 55,
            playerTwoScore: 67
        },
        {
            playerTwoScore: 74,
            playerOneId: 'HIQOpWA5E6MV4BdoCTdPmW7VE4f2',
            playerTwoId: 'KxmYyvDFVLQbP9yjcaJAHnj027x1',
            playerOneScore: 54
        },
        {
            playerTwoScore: 47,
            playerOneId: 'IrLsvrpKL8aSNV6f4oZGXoyGnU82',
            playerTwoId: 'CnRz7fTqSaNz6JPGVOgC4HciFHV2',
            playerOneScore: 69
        },
        {
            playerOneId: '6nPZE6SHWiU4mYM7kzClvFNT3VC2',
            playerTwoScore: 49,
            playerTwoId: 'dxoz15O3fngkuJDFcEGXEhD4hfl1',
            playerOneScore: 42
        },
        {
            playerTwoScore: 93,
            playerTwoId: 'MRqGLRqh9ZdptCbeEDAJk0EgEL63',
            playerOneScore: 58,
            playerOneId: '824fA5dhUcb3pnoU4sSPcQvba832'
        },
        {
            playerOneScore: 94,
            playerTwoId: 'fmLNZXDj2iOVhcuRWWCz8tAlLNw2',
            playerTwoScore: 65,
            playerOneId: 'IcNMvovVRJdasonke4mhogB9OIk2'
        },
        {
            playerTwoId: 'DgyAdJgopgYPFJxtaHJkD1xJEM83',
            playerTwoScore: 81,
            playerOneId: 'ysN9HlSpEbY3bNhhRRj8o6tO36v2',
            playerOneScore: 62
        },
        {
            playerTwoId: '5fsvx5UfywS66pAgsGrrZuUsmsu1',
            playerOneScore: 88,
            playerOneId: 'IwbKtfqoO9bGtgMSTxkh47bQcki2',
            playerTwoScore: 83
        },
        {
            playerOneId: '2ncLyF7w3JR4mMBbVHYwk4KMF0C2',
            playerTwoScore: 88,
            playerOneScore: 82,
            playerTwoId: '31Q4ai6oGBdFOb73lfHGIaaotq52'
        },
        {
            playerTwoId: 'ok4hSEXd37WehtsvK8yfjdKq9mm1',
            playerOneId: 'suZCYvMChRPtC1t9ByfngiVsJAw1',
            playerOneScore: 49,
            playerTwoScore: 81
        }
    ];

    it('The WeekInfo component renders without crashing', () => {
        const wrapper = shallow(<WeekInfo />);
        expect(() => wrapper).not.toThrow();
    });

    it('The WeekInfo component renders with byes', () => {
        const wrapper = shallow(<WeekInfo
            byes={byes}
            displayNameMappings={displayNameMappings}
            pairings={pairings}
        />);
        expect(() => wrapper).not.toThrow();
        expect(wrapper.find('.bye')).toHaveLength(25);
        expect(wrapper.find('.pairingWrapper')).toHaveLength(16);
    });
});
